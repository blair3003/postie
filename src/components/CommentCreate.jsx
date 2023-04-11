import { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useApplicationContext } from '../app/store'

const CommentCreate = ({ post, parent }) => {

    const { createComment, user, loading, error } = useApplicationContext()

    const [body, setBody] = useState('')

    const bodyRef = useRef()

    const handleSubmitComment = async (e) => {
        console.log('commenting')
        e.preventDefault()
        if (!body) return
        const comment = await createComment({
            postId: post,
            authorId: user.id,
            body,
            parentId: parent?._id
        })
        if (comment && !error) location.reload()
    }

    useEffect(() => {
        bodyRef.current.focus()
    }, [])

    return (
        <form onSubmit={handleSubmitComment} className="text-black">
            
            <div className="flex items-center gap-2">

                
                <div className="w-8">
                    <img className="rounded-full drop-shadow" src={user?.pic ? user?.pic : '/img/default-pic.png'} alt={user?.name} />
                </div>

                <div className="flex items-center gap-2 grow rounded-lg p-1 bg-white">
                    <label htmlFor="body" className="offscreen">Post a comment:</label>
                    <input
                        id="body"
                        type="text"
                        placeholder="Add a comment"
                        required
                        className="w-full rounded-lg p-2 bg-trans"
                        ref={bodyRef}
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="p-4 hover:bg-yellow-500 text-black rounded-full w-12 h-12 flex justify-center items-center text-xl font-bold"
                        disabled={loading}
                    >
                        <AiOutlinePlus />
                    </button>

                </div>
                

            </div>

        </form>
    )
}

export default CommentCreate