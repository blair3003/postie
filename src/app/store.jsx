import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react'
import jwtDecode from 'jwt-decode'

const ApplicationContext = createContext()

export const useApplicationContext = () => useContext(ApplicationContext)

export const ApplicationContextProvider = ({ children }) => {

    const ready = useRef(true)
    const tokenRef = useRef('')

    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false)
    
    const getPosts = async () => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch(`http://localhost:3500/posts`)
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

    const createPost = async (post) => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch('http://localhost:3500/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenRef.current}`
                },
                body: JSON.stringify(post)
            })
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data.post
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
                const newToken = await refreshToken()
                if (!newToken) throw new Error(`RefreshError: ${response.status}`)
                tokenRef.current = newToken
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
                const newToken = await refreshToken()
                if (!newToken) throw new Error(`RefreshError: ${response.status}`)
                tokenRef.current = newToken
                return updatePost(post)
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
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
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
            tokenRef.current = data.accessToken
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
            tokenRef.current = ''
            setPersist(false)
            setLoading(false)           
        }        
    }

    const refreshToken = async () => {
        console.log(`Making refresh fetch call`)
        try {
            const response = await fetch('http://localhost:3500/auth/refresh', {
                credentials: 'include',
            })
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data.accessToken
        } catch (err) {
            tokenRef.current = ''
            setPersist(false)
            console.error(err)
        }
    }

    const handlePersist = async () => {
        const token = await refreshToken()
        if (token) tokenRef.current = token
    }

    useEffect(() => {
        if (ready.current) {
            if (persist) handlePersist()
            return () => ready.current = false
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist))
    }, [persist])

    useEffect(() => {
        if (tokenRef.current) {
            const { id, name, email, pic, roles } = jwtDecode(tokenRef.current).user
            setUser({
                id,
                name,
                email,
                pic,
                roles
            })
        } else setUser(null)
    }, [tokenRef.current])

    return (
        <ApplicationContext.Provider value={{
            getPost,
            getPosts,
            createPost,
            updatePost,
            deletePost,
            createComment,
            registerUser,
            loginUser,
            logoutUser,
            loading,
            error,
            setError,
            tokenRef,
            user,
            refreshToken,
            persist,
            setPersist
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}