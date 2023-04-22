import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiFillExclamationCircle,
         AiFillInfoCircle,
         AiOutlineCheck,
         AiOutlineClose,
         AiOutlineLoading3Quarters,
         AiOutlineUpload } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'
import useRegex from '../../hooks/useRegex'
import useTitle from '../../hooks/useTitle'

const ProfileEdit = () => {

    const navigate = useNavigate()
    const ready = useRef(true)
    const errorRef = useRef()

    const { id } = useParams()
    const { NAME_REGEX,
            EMAIL_REGEX,
            PASSWORD_REGEX } = useRegex()    
    const { user,
            getFetch,
            loading,
            error,
            setError } = useApplicationContext()

    const [profile, setProfile] = useState()
    const [pic, setPic] = useState(null)
    const [preview, setPreview] = useState('')

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

    const handleGetProfile = async () => {
        if (!user?.roles.includes('admin') && user?.id !== id) navigate(`/users/${id}`)
        const data = await getFetch({ url: `users/${id}` })
        if (data) setProfile(data)
    }

    const handleUpdateProfile = async e => {
        e.preventDefault()
        if (![name, email].every(Boolean)) return setError(true)
        if (password && (!passwordValid || !matchValid)) return setError(true)
        const data = await getFetch({
            url: 'users',
            method: 'PATCH',
            auth: true,
            body: {
                id,
                name,
                email,
                password,
                pic
            }
        })
        if (data?.updated && !error) navigate(`/users/${data.updated._id}`)
    }

    useEffect(() => {
        if (ready.current) {
            handleGetProfile()
            return () => ready.current = false
        }
    }, [])

    useEffect(() => {
        if (profile) {
            setName(profile.name)
            setEmail(profile.email)
            setPassword('')
            setMatch('')
            if (profile.pic) setPreview(profile.pic)
        }
    }, [profile])

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
        if (pic) setPreview(URL.createObjectURL(pic))
    }, [pic])

    useEffect(() => {
        setError(false)        
    }, [name, email, password, match, pic])

    useEffect(() => {
        if (error) errorRef.current.focus()
    }, [error])

    useTitle('Edit profile')

    return (
        !profile ? <p>Loading profile...</p> :
        error ? <p>Error loading profile!</p> :

        <section className="max-w-xl mx-auto bg-slate-800 p-4 rounded-lg shadow-xl">
            <h1 className="text-2xl text-white p-2 mb-4 font-pacifico">Edit user</h1>
            {error ? <p ref={errorRef} className="bg-red-600 text-white font-bold p-2 mb-4 rounded-lg shadow" aria-live="assertive">
                <AiFillExclamationCircle className="inline mb-1" /> Error!
            </p> : null}

            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">

                <label htmlFor="name" className="offscreen">Name:</label>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-xl">
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        className="rounded-lg p-2 grow"
                        autoComplete="off"
                        required
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
                {email && emailFocus && !emailValid ? <p id="email-description" className="bg-black p-2 rounded-lg text-white">
                    <AiFillInfoCircle className="inline mb-1"/> Must be an appropriate email.
                </p> : null }

                <label htmlFor="password" className="offscreen">Password:</label>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-xl">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        className="rounded-lg p-2 grow"
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
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-xl">
                    <input
                        type="password"
                        id="match"
                        placeholder="Confirm Password"
                        className="rounded-lg p-2 grow"
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

                <label htmlFor="thumbnail" className="flex flex-col gap-2 p-2 cursor-pointer">
                    <div className="flex items-center gap-4">
                        <span className="text-white text-xl font-pacifico mb-1">Profile pic:</span>
                        {!preview ? <span className="flex justify-center items-center w-10 h-10 bg-teal-600 hover:bg-teal-600/90 text-white text-2xl rounded-full shadow-xl">
                            <AiOutlineUpload />
                        </span> : null}
                    </div>
                    {preview ? <img src={preview} alt={name} className="shadow-xl"/> : null}
                    <input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        className="offscreen"
                        onChange={e => setPic(e.target.files[0])}
                    />
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="p-4 mb-8 bg-orange-600 hover:bg-orange-600/90 disabled:bg-orange-600/90 text-white font-bold rounded-lg leading-none shadow-xl"
                >
                    {loading ? <AiOutlineLoading3Quarters className="mx-auto" /> : "update"}
                </button>

            </form>            
        </section>
    )
}

export default ProfileEdit