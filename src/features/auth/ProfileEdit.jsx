import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { AiOutlineClose, AiOutlineCheck, AiOutlineLoading3Quarters, AiFillInfoCircle } from 'react-icons/ai'
import { format } from 'date-fns'
import { useApplicationContext } from '../../app/store'

const ProfileEdit = () => {

    const ready = useRef(true)
    const nameRef = useRef()
    const errorRef = useRef()

    const { id } = useParams()
    const { getProfile, updateUser, user, loading, error } = useApplicationContext()    
    const [profile, setProfile] = useState()
    const [pic, setPic] = useState()

    const handleGetProfile = async () => {
        const data = await getProfile(id)
        if (data) {
            const canEdit = user?.roles.includes('admin') || user?.id === data?.author.id
            if (!canEdit) navigate(`/users/${id}`)
            setProfile(data)
        }
    }

    const handleUpdateProfile = async e => {
        e.preventDefault()
        if (![title, thumbnail, body, authorId].every(Boolean)) return
        const post = await updateUser({
            title,
            thumbnail,
            body,
            tags,
            authorId
        })
        if (post && !error) {
            navigate(`/posts/${post._id}`)
        }
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

        <section className="max-w-xl mx-auto bg-red-900/50 text-sky-200 p-4 rounded-lg">
            <h1 className="text-2xl text-white mb-4 p-4">Edit User</h1>
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">

                <label htmlFor="thumbnail" className="offscreen">Profile pic:</label>
                <input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    required
                    className="rounded-lg p-4"
                    onChange={e => setPic(e.target.files[0])}
                />

                <button type="submit" disabled={loading} className="p-4 bg-black hover:bg-yellow-500 text-white hover:text-black rounded-lg leading-none">
                    {loading ? <AiOutlineLoading3Quarters className="mx-auto" /> : "Update"}
                </button>




            </form>            
        </section>
    )
}

export default ProfileEdit