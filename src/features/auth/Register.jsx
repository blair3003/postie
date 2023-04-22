import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillInfoCircle,
         AiFillExclamationCircle,
         AiOutlineCheck,
         AiOutlineClose,
         AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'
import useRegex from '../../hooks/useRegex'
import useTitle from '../../hooks/useTitle'

const Register = () => {

    const navigate = useNavigate()
    const nameRef = useRef()
    const errorRef = useRef()

    const { NAME_REGEX,
            EMAIL_REGEX,
            PASSWORD_REGEX } = useRegex()
    const { getFetch,
            loading,
            error,
            setError } = useApplicationContext()

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

    const handleRegister = async e => {
        e.preventDefault()
        if (!nameValid ||
            !emailValid ||
            !passwordValid ||
            !matchValid) return
        const data = await getFetch({
            url: 'auth/register',
            method: 'POST',
            body: {
                name,
                email,
                password
            }
        })
        if (data?.user && !error) navigate('/login')
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
        <section className="max-w-xl mx-auto bg-slate-800 p-4 rounded-lg shadow-xl">
            <h1 className="text-2xl text-white p-2 mb-4 font-pacifico">Register new user</h1>
            {error ? <p ref={errorRef} className="bg-red-600 text-white font-bold p-2 mb-4 rounded-lg shadow" aria-live="assertive">
                <AiFillExclamationCircle className="inline mb-1" /> Error!
            </p> : null}

            <form onSubmit={handleRegister} className="flex flex-col gap-4">

                <label htmlFor="name" className="offscreen">Name:</label>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-xl">
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
                {name && nameFocus && !nameValid ? <p id="name-description" className="bg-teal-600 p-2 rounded-lg text-white">
                    <AiFillInfoCircle className="inline mb-1"/> Must begin with a letter. 23 chars max.
                </p> : null }

                <label htmlFor="email" className="offscreen">Email:</label>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-xl">
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
                {email && emailFocus && !emailValid ? <p id="email-description" className="bg-teal-600 p-2 rounded-lg text-white">
                    <AiFillInfoCircle className="inline mb-1"/> Must be an appropriate email.
                </p> : null }

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
                        onFocus={e => setPasswordFocus(true)}
                        onBlur={e => setPasswordFocus(false)}
                        aria-invalid={passwordValid ? "false" : "true"}
                        aria-describedby="password-description"
                    />
                    {passwordValid ? <AiOutlineCheck className="mx-2 text-green-700" /> :
                     password ? <AiOutlineClose className="mx-2 text-red-700" /> : null}
                </div>
                {password && passwordFocus && !passwordValid ? <p id="email-description" className="bg-teal-600 p-2 rounded-lg text-white">
                    <AiFillInfoCircle className="inline mb-1"/> Stronger password required. 8 to 23 chars long.
                </p> : null }

                <label htmlFor="match" className="offscreen">Confirm Password:</label>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-xl">
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
                {match && matchFocus && !matchValid ? <p id="email-description" className="bg-teal-600 p-2 rounded-lg text-white">
                    <AiFillInfoCircle className="inline mb-1"/> Needs to match password.
                </p> : null }

                <button
                    type="submit"
                    className="p-4 bg-orange-600 hover:bg-orange-600/90 disabled:bg-orange-600/90 text-white font-bold rounded-lg leading-none shadow-xl"
                    disabled={!loading && nameValid && emailValid && passwordValid && matchValid ? false : true}
                >
                    {loading ? <AiOutlineLoading3Quarters className="mx-auto" /> : 'register'}
                </button>
            </form>

            <p className="p-2 mt-4 text-white">
                Already registered? <br />
                <Link to="/login" className="underline font-bold">Log in</Link>
            </p>

        </section>
    )
}

export default Register