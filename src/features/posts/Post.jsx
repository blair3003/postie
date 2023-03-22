import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'
import parse from 'html-react-parser'
import { format } from 'date-fns'
import { useApplicationContext } from '../../app/store'
import Comments from '../../components/Comments'
import CommentCreate from '../../components/CommentCreate'

const Post = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState()

    const ready = useRef(true)

    const { getPost, loading, error, user } = useApplicationContext()

    const handleEditPost = () => navigate(`/posts/${id}/edit`)

    const handleGetPost = async () => {
        const data = await getPost(id)
        if (data) setPost(data)
    }

    useEffect(() => {
        if (ready.current) {
            handleGetPost()
            return () => ready.current = false
        }
    }, [])

    return (
        loading ? null :
        post ?        
        <article className="max-w-xl mx-auto bg-red-900/50 text-sky-200 sm:rounded-lg mb-8">
            <div className="flex gap-4 p-4">
                <div className="w-12">
                    <img className="rounded-full drop-shadow" src={post.author.pic ? post.author.pic : '/img/default-pic.png'} alt={post.author.name} />
                </div>
                <div className="grow">
                    <p className="font-bold">{post.author.name}</p>
                    <p>{format(Date.parse(post.createdAt), 'MMMM do, yyyy')}</p>
                </div>
                {user ? <button onClick={handleEditPost} className="text-3xl hover:text-white">
                    <AiFillEdit />
                </button> : null}
            </div>
            <h1 className="text-2xl px-4 font-bold">{post.title}</h1>
            <div className="flex gap-2 p-4">
            {post.tags && post.tags.map(tag =>
                <div key={tag} className="px-3 pb-1 bg-yellow-500 text-black rounded-full text-sm font-semibold">{tag}</div>
            )}
            </div>  
            <div className="">
                <img className="w-full" src={post.thumbnail ? post.thumbnail : '/img/default-thumbnail.png'} alt={post.title} />
            </div>
            <div className="p-4">{parse(post.body)}</div>
            <section className="p-4 flex flex-col gap-4">
                <h2 className="offscreen">Comments</h2>
                {user ? <CommentCreate post={id}/> : null}
                <Comments post={id} comments={post.comments}/>
            </section>
        </article>
        : null
    )
}

export default Post