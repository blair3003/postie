import {
    createContext,
    useContext,
    useState,
} from 'react'

const ApplicationContext = createContext({
    error: false,
    loading: false
})

export const useApplicationContext = () => useContext(ApplicationContext)

export const ApplicationContextProvider = ({ children }) => {

    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    
    const getPosts = async () => {
        console.log('Getting posts')
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

    return (
        <ApplicationContext.Provider value={{
            getPost,
            getPosts,
            createPost,
            updatePost,
            loading,
            error,
            setError           
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}