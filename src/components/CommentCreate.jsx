import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineLoading3Quarters, AiOutlinePlus } from 'react-icons/ai'
import { useApplicationContext } from '../app/store'

const CommentCreate = ({ post, parent }) => {

    const bodyRef = useRef()

    const {
        user, 
        getFetch,
        loading,
        error
    } = useApplicationContext()
    
    const [body, setBody] = useState('')

    const handleSubmitComment = async e => {
        e.preventDefault()
        if (!body) return
        const data = await getFetch({
            url: 'posts/comments',
            method: 'POST',
            auth: true,
            body: {
                postId: post,
                authorId: user.id,
                body,
                parentId: parent?._id
            }
        })
        if (data && !error) location.reload()
    }

    useEffect(() => {
        if (parent) bodyRef.current.focus()
    }, [])

    return (
        <form onSubmit={handleSubmitComment}>            
            <div className="flex items-center gap-2">                
                <Link to={`/users/${user.id}`} className="w-10 h-10 overflow-hidden rounded-full shadow">
                    <img src={user.pic ? user.pic : '/img/default-pic.png'} alt={user.name} />
                </Link>
                <label htmlFor="body" className="offscreen">Post a comment:</label>
                <div className="flex items-center justify-between grow bg-white p-2 rounded-lg shadow">
                    <input
                        id="body"
                        type="text"
                        placeholder="Add a comment"
                        className="rounded-lg p-2 grow"
                        required
                        ref={bodyRef}
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="flex justify-center items-center w-10 h-10 ml-2 text-white text-xl font-bold bg-teal-600 hover:bg-teal-600/90 shadow rounded-full"
                        disabled={loading}
                    >
                        {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : <AiOutlinePlus />}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default CommentCreate