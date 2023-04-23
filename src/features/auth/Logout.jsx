import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillExclamationCircle } from 'react-icons/ai'
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
        <section className="max-w-xl mx-auto bg-slate-800 p-4 rounded-lg shadow-xl">
            <h1 className="text-2xl text-white p-2 mb-4 font-pacifico">Logging out...</h1>
            {error ? <p ref={errorRef} className="bg-red-600 text-white font-bold p-2 mb-4 rounded-lg shadow" aria-live="assertive">
                <AiFillExclamationCircle className="inline mb-1" /> {error}
            </p> : null}
        </section>
    )

}

export default Logout