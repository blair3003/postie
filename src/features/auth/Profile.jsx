import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useApplicationContext } from '../../app/store'

const Profile = () => {

    const ready = useRef(true)    
    const { id } = useParams()
    const { getProfile, user, loading, error } = useApplicationContext()    
    const [profile, setProfile] = useState()

    const handleGetProfile = async () => {
        const data = await getProfile(id)
        if (data) setProfile(data)
    }

    useEffect(() => {
        if (ready.current) {
            handleGetProfile()
            return () => ready.current = false
        }
    }, [])


    return (
        loading ? null :
        error ? null :
        !profile ? null :

        <section className="max-w-xl mx-auto bg-red-900/50 text-black p-4 rounded-lg">
            <h1 className="text-2xl text-white mb-4">{profile.name}</h1>

        </section>
    )
}

export default Profile