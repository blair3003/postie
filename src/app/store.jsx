import {
    createContext,
    useContext,
    useState
} from 'react'

const ApplicationContext = createContext({
    error: false,
    loading: false
})

export const useApplicationContext = () => useContext(ApplicationContext)

export const ApplicationContextProvider = ({ children }) => {

    // const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwNzk3MGE4NTg0MWRjMDM2NTNjMDBjIiwibmFtZSI6IkJsYWlyIiwiZW1haWwiOiJibGFpckBmb3J0aGRldi5jb20iLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNjc5MTM2NzczLCJleHAiOjE2NzkxMzY4MDN9.bSXZpz0h6qrrdExtH099-2lIN4S-kzMkxlu15wNbh-g")
    const [token, setToken] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    
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
                    'Content-Type': 'application/json'
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
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

    const deletePost = async (id) => {
        try {
            setError(false)
            setLoading(true)
            const response = await fetch('http://localhost:3500/posts', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id)
            })
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data.deleted
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
                body: JSON.stringify(user)
            })
            if(!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data.accessToken
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }

    }

    return (
        <ApplicationContext.Provider value={{
            getPost,
            getPosts,
            createPost,
            updatePost,
            deletePost,
            registerUser,
            loginUser,
            loading,
            error,
            setError,
            token,     
            setToken,
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}