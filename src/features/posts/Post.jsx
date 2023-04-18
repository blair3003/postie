import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'
import parse from 'html-react-parser'
import { format } from 'date-fns'
import { useApplicationContext } from '../../app/store'
import Comments from '../../components/Comments'
import CommentCreate from '../../components/CommentCreate'
import useTitle from '../../hooks/useTitle'

const Post = () => {

    const ready = useRef(true)
    const navigate = useNavigate()
    const { id } = useParams()
    const { getFetch, loading, error, user } = useApplicationContext() 
    const [post, setPost] = useState()

    const canEdit = user?.roles.includes('admin') || user?.id === post?.author.id

    const handleGetPost = async () => {
        const data = await getFetch({ url: `posts/${id}` })
        if (data) {
            setPost(data)
        }
    }

    useEffect(() => {
        if (ready.current) {
            handleGetPost()
            return () => ready.current = false
        }
    }, [])

    useTitle(post?.title)

    return (
        loading ? null :
        post ?        
        <article className="max-w-xl mx-auto bg-red-900/50 text-sky-200 sm:rounded-lg mb-8">
            <div className="flex gap-4 p-4">
                <div className="w-12">
                    <img className="rounded-full drop-shadow" src={post.author.pic ? post.author.pic : '/img/default-pic.png'} alt={post.author.name} />
                </div>
                <div className="grow">
                    <Link to={`/users/${post.author.id}`} className="font-bold">{post.author.name}</Link>
                    <p>{format(Date.parse(post.createdAt), 'MMMM do, yyyy')}</p>
                </div>
                {canEdit ? <button onClick={() => navigate(`/posts/${id}/edit`)} className="text-3xl hover:text-white">
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