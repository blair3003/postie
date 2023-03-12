import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import { useApplicationContext } from '../../app/store'

const Post = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const { post, setPostId, loading, error, setError } = useApplicationContext()

    useEffect(() => {
        setPostId(id)
    }, [id])
    
    useEffect(() => {
        if (error) {
            setError(false)
            navigate('/')
        }
    }, [error])

    return (
        loading ? <p>Loading...</p> :
        post ?        
        <article className="">
            <div className="bg-white p-4 rounded-lg">
                <img className="w-full" src={post.thumbnail ?? '/img/default-thumbnail.png'} alt={post.title} />
            </div>
            <div className="flex gap-4 p-4">
                <div className="w-12">
                    <img className="rounded-full drop-shadow" src={post.author.pic ?? '/img/default-pic.png'} alt={post.author.name} />
                </div>
                <div>
                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <p>{post.author.name}</p>
                    <p>{post.createdAt}</p>
                </div>
            </div>
            <div>{parse(post.body)}</div>  
        </article>
        : null
    )
}

export default Post