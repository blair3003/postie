import { useRef, useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { AiOutlineClose, AiOutlineCheck, AiOutlineLoading3Quarters, AiFillInfoCircle } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'
import useTitle from '../../hooks/useTitle'

const Register = () => {

    const { getFetch, loading, error, setError } = useApplicationContext()

    const nameRef = useRef()
    const errorRef = useRef()

    const location = useLocation()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [nameValid, setNameValid] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [match, setMatch] = useState('')
    const [matchValid, setMatchValid] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_' ]{0,23}$/
    const EMAIL_REGEX = /^.+@.+\.[a-zA-Z]{2,}$/
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"£$%^&*()\-_=+{}[\]'@#~?/\\|,.<>]).{8,24}$/

    const handleRegister = async e => {
        e.preventDefault()
        if (!nameValid || !emailValid || !passwordValid || !matchValid) return
        const data = await getFetch({
            url: 'auth/register',
            method: 'POST',
            body: {
                name,
                email,
                password
            }
        })
        if (data.user && !error) {
            navigate('/login')
        }        
    }

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        setNameValid(NAME_REGEX.test(name))
    }, [name])

    useEffect(() => {
        setEmailValid(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setPasswordValid(PASSWORD_REGEX.test(password))
        setMatchValid(password === match)
    }, [password, match])

    useEffect(() => {
        setError(false)        
    }, [name, email, password, match])

    useEffect(() => {
        if (error) errorRef.current.focus()
    }, [error])

    useTitle('Register')

    return (
        <section className="max-w-xl mx-auto bg-red-900/50 text-black p-4 rounded-lg">
            <h1 className="text-2xl text-white mb-4">Register new user</h1>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">

                {error ? <p ref={errorRef} className="bg-black text-white font-bold p-4 rounded-lg" aria-live="assertive">Error!</p> : null}

                <label htmlFor="name" className="offscreen">Name:</label>

                <div className="rounded-lg flex items-center justify-between bg-white p-2">
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        className="rounded-lg p-2 grow"
                        autoComplete="off"
                        required
                        ref={nameRef}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onFocus={e => setNameFocus(true)}
                        onBlur={e => setNameFocus(false)}
                        aria-invalid={nameValid ? "false" : "true"}
                        aria-describedby="name-description"
                    />
                    {nameValid ? <AiOutlineCheck className="mx-2 text-green-700" /> :
                     name ? <AiOutlineClose className="mx-2 text-red-700" /> : null}                    
                </div>
                {name && nameFocus && !nameValid ? <p id="name-description" className="bg-black p-2 rounded-lg text-white">
                    <AiFillInfoCircle className="inline mb-1"/> Must begin with a letter. 23 chars max. No funny business please.
                </p> : null }

                <label htmlFor="email" className="offscreen">Email:</label>
                <div className="rounded-lg flex items-center justify-between bg-white p-2">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className="rounded-lg p-2 grow"
                        autoComplete="off"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onFocus={e => setEmailFocus(true)}
                        onBlur={e => setEmailFocus(false)}
                        aria-invalid={emailValid ? "false" : "true"}
                        aria-describedby="email-description"
                    />
                    {emailValid ? <AiOutlineCheck className="mx-2 text-green-700" /> :
                     email ? <AiOutlineClose className="mx-2 text-red-700" /> : null}
                </div>
                {email && emailFocus && !emailValid ? <p id="email-description" className="bg-black p-2 rounded-lg text-white">
                    <AiFillInfoCircle className="inline mb-1"/> Must be an appropriate email.
                </p> : null }

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
                        onFocus={e => setPasswordFocus(true)}
                        onBlur={e => setPasswordFocus(false)}
                        aria-invalid={passwordValid ? "false" : "true"}
                        aria-describedby="password-description"
                    />
                    {passwordValid ? <AiOutlineCheck className="mx-2 text-green-700" /> :
                     password ? <AiOutlineClose className="mx-2 text-red-700" /> : null}
                </div>
                {password && passwordFocus && !passwordValid ? <p id="email-description" className="bg-black p-2 rounded-lg text-white">
                    <AiFillInfoCircle className="inline mb-1"/> Stronger password required. 8 to 23 chars long.
                </p> : null }

                <label htmlFor="match" className="offscreen">Confirm Password:</label>
                <div className="rounded-lg flex items-center justify-between bg-white p-2">
                    <input
                        type="password"
                        id="match"
                        placeholder="Confirm Password"
                        className="rounded-lg p-2 grow"
                        required
                        value={match}
                        onChange={e => setMatch(e.target.value)}
                        onFocus={e => setMatchFocus(true)}
                        onBlur={e => setMatchFocus(false)}
                        aria-invalid={matchValid ? "false" : "true"}
                        aria-describedby="match-description"
                    />
                    {matchValid && match ? <AiOutlineCheck className="mx-2 text-green-700" /> :
                    !matchValid && match ? <AiOutlineClose className="mx-2 text-red-700" /> : null}
                </div>
                {match && matchFocus && !matchValid ? <p id="email-description" className="bg-black p-2 rounded-lg text-white">
                    <AiFillInfoCircle className="inline mb-1"/> Needs to match password.
                </p> : null }

                <button
                    type="submit"
                    className="p-4 bg-black hover:bg-yellow-500 text-white hover:text-black rounded-lg leading-none disabled:hover:bg-black disabled:hover:text-zinc-300 disabled:text-zinc-300 disabled:line-through"
                    disabled={nameValid && emailValid && passwordValid && matchValid ? false : true}
                >
                    {loading ? <AiOutlineLoading3Quarters className="mx-auto" /> : 'Register'}
                </button>
            </form>

            <p className="p-2 mt-2 text-white">Already registered? <br />
            <Link to="/login" className="underline font-bold">Log in</Link></p>

        </section>
    )
}

export default Register