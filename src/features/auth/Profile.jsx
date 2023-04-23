import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'
import Loading from '../../components/Loading'
import useTitle from '../../hooks/useTitle'

const Profile = () => {

    const ready = useRef(true)
    const navigate = useNavigate()  

    const { id } = useParams()
    const { user,
            getFetch,
            error } = useApplicationContext()

    const [profile, setProfile] = useState()

    const canEdit = user?.roles.includes('admin') || user?.id === id

    const handleGetProfile = async () => {
        const data = await getFetch({ url: `users/${id}` })
        if (!data) navigate('/')
        setProfile(data)
    }

    useEffect(() => {
        if (ready.current) {
            handleGetProfile()
            return () => ready.current = false
        }
    }, [])

    useTitle(profile?.name)

    return (
        !profile ? <Loading /> :

        <article className="max-w-2xl mx-auto bg-white/50 p-4 mb-8 rounded-lg shadow">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl p-2 font-pacifico">User profile</h1>
                {canEdit &&
                <button onClick={() => navigate(`/users/${id}/edit`)} className="text-3xl hover:text-black/90 p-2">
                    <AiFillEdit />
                </button>}
            </div>
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex flex-col p-2 gap-2 grow shrink">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p>User since: <span className="font-bold">{format(Date.parse(profile.createdAt), 'MMMM do, yyyy')}</span></p>
                    <p className="flex items-center gap-2">Active: {profile.active ? <AiOutlineCheck /> : <AiOutlineClose />}</p>
                </div>
                {profile.pic &&
                <div className="w-40 h-40 rounded-full m-2 overflow-hidden">
                    <img src={profile.pic} alt={profile.name}/>
                </div>}
            </div>            
        </article>
    )
}

export default Profile