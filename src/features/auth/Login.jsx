import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiFillExclamationCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'
import useTitle from '../../hooks/useTitle'

const Login = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const emailRef = useRef()
    const errorRef = useRef()

    const {
        user,
        getFetch,
        updateToken,
        loading,
        error,
        setError,
        persist,
        setPersist
    } = useApplicationContext()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async e => {
        e.preventDefault()        
        const data = await getFetch({
            url: 'auth',
            method: 'POST',
            credentials: true,
            body: {
                email,
                password
            }
        })
        if (data?.accessToken && !error) updateToken(data.accessToken)
    }

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        if (user) navigate(location.state?.from.pathname ?? '/', { replace: true })
    }, [user])

    useEffect(() => {
        setError(false)        
    }, [email, password])

    useEffect(() => {
        if (error) errorRef.current.focus()
    }, [error])

    useTitle('Login')

    return (
        <section className="max-w-xl mx-auto bg-slate-800 p-4 rounded-lg shadow-xl"> 
            <h1 className="text-2xl text-white p-2 mb-4 font-pacifico">Login</h1>
            {error ? <p ref={errorRef} className="bg-red-600 text-white font-bold p-2 mb-4 rounded-lg shadow" aria-live="assertive">
                <AiFillExclamationCircle className="inline mb-1" /> Error!
            </p> : null}
            
            <form onSubmit={handleLogin} className="flex flex-col gap-4">

                <label htmlFor="email" className="offscreen">Email:</label>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-xl">
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
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-xl">
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
                    className="p-4 bg-orange-600 hover:bg-orange-600/90 text-white font-bold rounded-lg leading-none shadow-xl"
                >
                    {loading ? <AiOutlineLoading3Quarters className="mx-auto" /> : 'log in'}
                </button>

                <label htmlFor="persist" className="flex items-center gap-2 text-white cursor-pointer px-2 text-sm">
                    <input
                        type="checkbox"
                        className="w-6 h-6 cursor-pointer accent-teal-600 shadow-xl"
                        id="persist"
                        checked={persist}
                        onChange={() => setPersist(prev => !prev)}
                    />
                    Remember me
                </label>

            </form>

            <p className="p-2 mt-4 text-white">
                Not registered? <br />
                <Link to="/register" className="underline font-bold">Register</Link>
            </p>

        </section>
    )

}

export default Login