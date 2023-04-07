import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useApplicationContext } from '../../app/store'

const ProfileEdit = () => {

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

        <section>
            <h1>{profile.name}</h1>

        </section>
    )
}

export default ProfileEdit