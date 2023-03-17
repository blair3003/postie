import { useRef, useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'

const Register = () => {

    const { registerUser, loading, error, setError } = useApplicationContext()

    const nameRef = useRef()
    const errorRef = useRef()

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
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

    const handleNameChange = e => setName(e.target.value)
    const handleEmailChange = e => setEmail(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)
    const handleMatchChange = e => setMatch(e.target.value)

    const handleRegister = async e => {
        e.preventDefault()
        // if (!nameValid || !emailValid || !passwordValid || !matchValid) return
        const user = await registerUser({
            name,
            email,
            password
        })
        if (user && !error) {
            // navigate(`/users/${user._id}`)
            console.log(`Registered user! - ${user.name}`)
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

    return (
        <form onSubmit={handleRegister} className="flex flex-col gap-4 max-w-3xl bg-red-900/50 p-4 rounded-lg text-black">

            {error ? <p ref={errorRef} className="bg-black text-white font-bold p-4" aria-live="assertive">Error!</p> : null}

            <label htmlFor="name" className="offscreen">Name:</label>
            <input
                type="text"
                id="name"
                placeholder="Name"
                className="rounded-lg p-4"
                required
                ref={nameRef}
                value={name}
                onChange={handleNameChange}
            />

            <label htmlFor="email" className="offscreen">Email:</label>
            <input
                type="email"
                id="email"
                placeholder="Email"
                className="rounded-lg p-4"
                required
                value={email}
                onChange={handleEmailChange}
            />

            <label htmlFor="password" className="offscreen">Password:</label>
            <input
                type="password"
                id="password"
                placeholder="Password"
                className="rounded-lg p-4"
                required
                value={password}
                onChange={handlePasswordChange}
            />

            <label htmlFor="confirm" className="offscreen">Confirm Password:</label>
            <input
                type="password"
                id="confirm"
                placeholder="Confirm Password"
                className="rounded-lg p-4"
                required
                value={match}
                onChange={handleMatchChange}
            />

            <button type="submit" className="p-4 bg-black hover:bg-yellow-500 text-white hover:text-black rounded-lg">
                {loading ? <AiOutlineLoading3Quarters className="mx-auto" /> : 'Register'}
            </button>
        </form>
    )
}

export default Register