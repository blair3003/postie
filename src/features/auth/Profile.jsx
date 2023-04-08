import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { AiFillEdit } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'

const Profile = () => {

    const ready = useRef(true)
    const navigate = useNavigate()    
    const { id } = useParams()
    const { getProfile, user, loading, error } = useApplicationContext()    
    const [profile, setProfile] = useState()

    const canEdit = user?.roles.includes('admin') || user?.id === id

    const handleGetProfile = async () => {
        const data = await getProfile(id)
        if (data) setProfile(data)
    }

    const handleEditProfile = () => navigate(`/users/${id}/edit`)

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

        <section className="max-w-xl mx-auto bg-red-900/50 text-sky-200 p-4 rounded-lg">
            <div className="flex items-center justify-between gap-4 p-4">
                <h1 className="text-2xl text-white">{profile.name}</h1>
                {canEdit ? <button onClick={handleEditProfile} className="text-3xl hover:text-white">
                    <AiFillEdit />
                </button> : null}
            </div>
        </section>
    )
}

export default Profile