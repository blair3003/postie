import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'

const Login = () => {

    const { loginUser, loading, error, setError, setToken } = useApplicationContext()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailRef = useRef()
    const errorRef = useRef()

    const location = useLocation()
    const navigate = useNavigate()

    const handleLogin = async e => {
        e.preventDefault()
        const accessToken = await loginUser({
            email,
            password
        })
        if (accessToken && !error) {
            setEmail('')
            setPassword('')
            setToken(accessToken)
            navigate(location.state.from.pathname, { replace: true })
        }
    }

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setError(false)        
    }, [email, password])

    useEffect(() => {
        if (error) errorRef.current.focus()
    }, [error])

    return (
        <section className="max-w-xl mx-auto bg-red-900/50 text-black p-4 rounded-lg">
            <h1 className="text-2xl text-white mb-4">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">

                {error ? <p ref={errorRef} className="bg-black text-white font-bold p-4 rounded-lg" aria-live="assertive">Error!</p> : null}

                <label htmlFor="email" className="offscreen">Email:</label>
                <div className="rounded-lg flex items-center justify-between bg-white p-2">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="rounded-lg p-2 grow"
                        required
                        ref={emailRef}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <label htmlFor="password" className="offscreen">Password:</label>
                <div className="rounded-lg flex items-center justify-between bg-white p-2">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="rounded-lg p-2 grow"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="p-4 bg-black hover:bg-yellow-500 text-white hover:text-black rounded-lg leading-none"
                >
                    {loading ? <AiOutlineLoading3Quarters className="mx-auto" /> : 'Log in'}
                </button>
            </form>

            <p className="p-2 mt-2 text-white">Not registered? <br />
            <a href="/register" className="underline font-bold">Register</a></p>

        </section>
    )

}

export default Login