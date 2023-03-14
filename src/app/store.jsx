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
    
    const [post, setPost] = useState()
    const [postId, setPostId] = useState()
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

    const fetchPost = async (id) => {
        try {
            console.log(`Fetchin gpost ${id}`)
            setError(false)
            setLoading(true)
            const response = await fetch(`http://localhost:3500/posts/${id}`)
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            setPost(data)
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }        
    }

    const createPost = async (data) => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch('http://localhost:3500/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
            const json = await response.json()
            return json.post
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

    useEffect(() => {
        if(postId) fetchPost(postId)
    }, [postId])

    return (
        <ApplicationContext.Provider value={{
            post,
            setPostId,
            createPost,
            posts,
            loading,
            error,
            setError            
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}