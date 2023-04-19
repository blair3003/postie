import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react'
import jwtDecode from 'jwt-decode'
import useFormData from '../hooks/useFormData'

const ApplicationContext = createContext()

export const useApplicationContext = () => useContext(ApplicationContext)

export const ApplicationContextProvider = ({ children }) => {

    const ready = useRef(true)
    const token = useRef('')

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false)
    const [user, setUser] = useState(null)

    const baseFetch = async (args) => {
        const url = args?.url ? `http://localhost:3500/${args.url}` : null
        const method = args?.method ?? 'GET'
        const headers = args?.auth ? { 'Authorization': `Bearer ${token.current}` } : {}
        const credentials = args?.credentials ? 'include' : 'omit'
        const body = args?.body ? useFormData(args.body) : null
        try {
            setError(false)
            setLoading(true)            
            const response = await fetch(url, { method, headers, credentials, body })
            return response
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const refreshFetch = async () => {
        if (!persist) return
        const refresh = await baseFetch({ url: 'auth/refresh', credentials: true })
        if (!refresh.ok) {
            updateToken(null)
            return false
        }
        const { accessToken } = await refresh.json()
        updateToken(accessToken)
        return true
    }

    const getFetch = async (args) => {
        let response = await baseFetch(args)
        if (response.status === 403) {
            const refresh = await refreshFetch()
            if (!refresh) return setError(true)
            response = await baseFetch(args)
        }
        if (!response.ok) return setError(true)
        const data = await response.json()
        return data        
    }

    const updateToken = (newToken) => {
        token.current = newToken
        updateUser()
    }

    const updateUser = () => {
        if (token.current) {
            const { id, name, email, pic, roles } = jwtDecode(token.current).user
            setUser({ id, name, email, pic, roles })
        } else {     
            setUser(null)      
        }
    }

    useEffect(() => {
        if (ready.current) {
            refreshFetch()
            return () => ready.current = false
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist))
    }, [persist])

    return (
        <ApplicationContext.Provider value={{
            error,
            getFetch,
            loading,
            persist,
            setError,
            setPersist,
            updateToken,
            user
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}