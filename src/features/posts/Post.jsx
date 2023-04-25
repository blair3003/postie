import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai'
import { format } from 'date-fns'
import { useApplicationContext } from '../../app/store'
import Comments from '../../components/Comments'
import CommentCreate from '../../components/CommentCreate'
import Loading from '../../components/Loading'
import useTitle from '../../hooks/useTitle'

const Post = () => {

    const navigate = useNavigate()
    const ready = useRef(true)
    const titleRef = useRef()
    
    const { id } = useParams()
    const {
        user,
        getFetch,
        error
    } = useApplicationContext()
    
    const [post, setPost] = useState()
    
    const canEdit = user?.roles.includes('admin') || user?.id === post?.author.id

    const handleGetPost = async () => {
        const data = await getFetch({ url: `posts/${id}` })
        if (!data) navigate('/')
        setPost(data)
    }

    useEffect(() => {
        if (ready.current) {
            handleGetPost()
            return () => ready.current = false
        }
    }, [])

    useEffect(() => {
        if (post) titleRef.current.focus()
    }, [post])

    useTitle(post?.title)

    return (
        !post ? <Loading /> :

        <article className="max-w-2xl mx-auto bg-white/50 mb-8 rounded-lg shadow">

            <div className="p-4">
                <div className="flex gap-4">
                    <Link to={`/users/${post.author.id}`} className="w-12 h-12 overflow-hidden rounded-full shadow">
                        <img src={post.author.pic ? post.author.pic : '/img/default-pic.png'} alt={post.author.name} />
                    </Link>
                    <div className="grow">
                        <Link to={`/users/${post.author.id}`} className="text-lg font-bold">{post.author.name}</Link>
                        <p>{format(Date.parse(post.createdAt), 'MMMM do, yyyy')}</p>
                    </div>
                    {canEdit &&
                    <button title="Delete post" onClick={() => navigate(`/posts/${id}/edit`)} className="text-3xl hover:text-black/90 p-2">
                        <AiFillEdit />
                    </button>}
                </div>

                <h1 ref={titleRef} className="text-2xl font-bold p-2">{post.title}</h1>

                {post.tags?.length &&
                <div className="flex gap-2 p-2">
                    {post.tags.map(tag => <div key={tag} className="px-3 bg-yellow-500 text-black text-sm rounded-full">{tag}</div>)}
                </div>}
            </div>

            <div className="flex flex-col">
                <Link to={post.thumbnail} target="_blank">
                    <img src={post.thumbnail} alt={post.title} />
                </Link>
                <p className="p-6 bg-slate-800 text-white">{post.body}</p>
            </div>

            <section className="p-6 flex flex-col gap-8" id="comments">
                <h2 className="offscreen">Comments</h2>
                {user &&
                <CommentCreate post={id}/>}
                <Comments post={id} comments={post.comments}/>
            </section>
        </article>
    )
}

export default Post