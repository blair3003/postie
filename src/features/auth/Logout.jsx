import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApplicationContext } from '../../app/store'

const Logout = () => {

    const { logoutUser, error } = useApplicationContext()

    const errorRef = useRef()
    const navigate = useNavigate()

    const handleLogout = async e => {
        const loggedOut = await logoutUser()
        if (loggedOut) navigate('/')
    }

    useEffect(() => {
        handleLogout()
    }, [])

    useEffect(() => {
        if (error) errorRef.current.focus()
    }, [error])

    return (
        <section className="max-w-xl mx-auto bg-red-900/50 text-black p-4 rounded-lg">
            <h1 className="text-2xl text-white mb-4">Logging out...</h1>

            {error ? <p ref={errorRef} className="bg-black text-white font-bold p-4 rounded-lg" aria-live="assertive">Error!</p> : null}

        </section>
    )

}

export default Logout