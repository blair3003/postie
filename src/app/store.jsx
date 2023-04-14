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
    const tokenRef = useRef('')

    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false)


    const baseFetch = async (args) => {
        const url = args?.url ? `http://localhost:3500/${args.url}` : null
        const method = args?.method ?? 'GET'
        const headers = args?.auth ? { 'Authorization': `Bearer ${tokenRef.current}` } : {}
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

    const getFetch = async (args) => {
        let response = await baseFetch(args)
        if (!response) return
        if (response.status === 403) {
            const refresh = await refreshToken()
            if (!refresh) return
            response = await baseFetch(args)
        }
        const data = await response.json()
        return data        
    }

    const refreshToken = async () => {
        if (!persist) return
        console.log('Refreshing access')
        const refresh = await baseFetch({ url: 'auth/refresh', credentials: true })
        if (!refresh.ok) {
            console.log('Login has expired')
            updateToken(null)
            return false
        }
        const { accessToken } = await refresh.json()
        updateToken(accessToken)
        return true
    }

    const updateToken = (token) => {
        tokenRef.current = token
        updateUser()
    }

    const updateUser = () => {
        if (tokenRef.current) {
            const { id, name, email, pic, roles } = jwtDecode(tokenRef.current).user
            setUser({ id, name, email, pic, roles })
        } else {     
            setUser(null)      
        }
    }

    useEffect(() => {
        if (ready.current) {
            refreshToken()
            return () => ready.current = false
        }
    }, [])


    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist))
    }, [persist])




















    // postsFetch({ method: 'POST', auth: true, body: { title: abc, ... } })
    const postsFetch = async (method = 'GET', auth = false, body = null) => {        
        try {
            setError(false)
            setLoading(true)            
            const response = await fetch('http://localhost:3500/posts', {
                method,
                headers: auth ? { 'Authorization': `Bearer ${tokenRef.current}` } : null,
                body: useFormData(body)
            })
            if (response.status === 403) {
                await handlePersist()
                return postsFetch(method, auth, body)
            }
            if (!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const getPost = async (id) => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch(`http://localhost:3500/posts/${id}`)
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }        
    }

    const getProfile = async (id) => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch(`http://localhost:3500/users/${id}`)
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }  

    }

    const updateProfile = async (profile) => {

        console.log(profile)


        try {
            setError(false)
            setLoading(true)

            const formData = new FormData()            
            Object.keys(profile).forEach(key => {
                if (profile[key]) formData.append(key, profile[key])
            })

            const response = await fetch('http://localhost:3500/users', {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${tokenRef.current}`
                },
                body: formData
            })
            if (response.status === 403) {
                await handlePersist()
                return updateProfile(profile)
            } else if (!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data.updated
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    } 

    const updatePost = async (post) => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch('http://localhost:3500/posts', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenRef.current}`
                },
                body: JSON.stringify(post)
            })
            if (response.status === 403) {
                await handlePersist()
                return updatePost(post)
            } else if (!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data.updated
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const deletePost = async (id) => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch('http://localhost:3500/posts', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenRef.current}`
                },
                body: JSON.stringify(id)
            })
            if (response.status === 403) {
                await handlePersist()
                return deletePost(post)
            } else if (!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data.deleted
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const createComment = async (comment) => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch('http://localhost:3500/posts/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenRef.current}`
                },
                body: JSON.stringify(comment)
            })
            if (response.status === 403) {
                await handlePersist()
                return createComment(comment)
            } else if (!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data.updated
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const registerUser = async (user) => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch('http://localhost:3500/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data.user
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const loginUser = async (user) => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch('http://localhost:3500/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(user)
            })
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            updateToken(data.accessToken)
            return data.accessToken
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const logoutUser = async () => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch('http://localhost:3500/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            updateToken(null)
            setPersist(false)
            setLoading(false)           
        }        
    }

    const handlePersist = async () => {
        if (persist) {
            console.log('Refreshing access')
            const refresh = await baseFetch({ url: 'auth/refresh', credentials: true })
            if (!refresh.ok) {
                console.log('Login has expired')
                return
            }
            const { accessToken } = await refresh.json()
            updateToken(accessToken)
        }
    }









    return (
        <ApplicationContext.Provider value={{
            getPost,
            getProfile,
            updateProfile,
            updatePost,
            deletePost,
            createComment,
            registerUser,
            loginUser,
            logoutUser,
            loading,
            error,
            setError,
            user,
            persist,
            setPersist,
            getFetch
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}