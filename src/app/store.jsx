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






    

    // postsFetch({ method: 'POST', body: { title: abc, ... } })
    const postsFetch = async (args) => {        
        try {
            setError(false)
            setLoading(true)
            const response = await fetch('http://localhost:3500/posts', {
                method: args.method,
                headers: {
                    'Authorization': `Bearer ${tokenRef.current}`
                },
                body: useFormData(args.body)
            })
            if (response.status === 403) {
                await handlePersist()
                return postsFetch(args)
            } else if (!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }





    
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

            const formData = new FormData()            
            Object.keys(post).forEach(key => formData.append(key, post[key]))

            const response = await fetch('http://localhost:3500/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${tokenRef.current}`
                },
                body: formData
            })

            if (response.status === 403) {
                await handlePersist()
                return createPost(post)
            } else if (!response.ok) throw new Error(`FetchError: ${response.status}`)
            const data = await response.json()
            return data.post
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
                return updateUser(post)
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
            updateToken(null)
            setPersist(false)
            console.error(err)
        }
    }

    const handlePersist = async () => {
        if (persist) {
            console.log('handling persist')
            const newToken = await refreshToken()
            if (newToken) updateToken(newToken)
        }
    }

    const updateToken = (token) => {
        tokenRef.current = token
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
    }

    useEffect(() => {
        if (ready.current) {
            handlePersist()
            return () => ready.current = false
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('persist', JSON.stringify(persist))
    }, [persist])

    return (
        <ApplicationContext.Provider value={{
            getPost,
            getPosts,
            getProfile,
            updateProfile,
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
            user,
            refreshToken,
            persist,
            setPersist
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}