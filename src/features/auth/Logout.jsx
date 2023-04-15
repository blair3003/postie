import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApplicationContext } from '../../app/store'

const Logout = () => {

    const ready = useRef(true)
    const errorRef = useRef()
    const navigate = useNavigate()

    const { getFetch, updateToken, error, setPersist } = useApplicationContext()

    const handleLogout = async e => {
        const data = await getFetch({
            url: 'auth/logout',
            method: 'POST',
            credentials: true
        })
        if (data && !error) {
            updateToken(null)
            setPersist(false)
            navigate('/')
        }
    }

    useEffect(() => {
        if (ready.current) {
            handleLogout()
            return () => ready.current = false
        }        
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