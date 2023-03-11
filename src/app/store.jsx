import {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef
} from 'react'

const ApplicationContext = createContext({
    posts: [],
    loading: false
})

export const useApplicationContext = () => useContext(ApplicationContext)

export const ApplicationContextProvider = ({ children }) => {
    
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const ready = useRef(true)
    
    const fetchPosts = async () => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch(`http://localhost:3500/posts`)
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            setPosts(data)
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }        
    }
    
    useEffect(() => {
        if (ready.current) {
            console.log('Ready')
            fetchPosts()
            return () => ready.current = false
        }
    }, [])

    return (
        <ApplicationContext.Provider value={{
            posts,
            loading,
            error
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}