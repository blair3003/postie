import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

const PostPreview = ({ post }) => {

    return (
        <article className="bg-white/50 p-4 rounded-lg shadow">
            <Link to={`/posts/${post._id}`} className="block aspect-video overflow-hidden rounded-lg">
                <img src={post.thumbnail ? post.thumbnail : 'img/default-thumbnail.png'} alt={post.title} />
            </Link>
            <div className="flex gap-4 mt-4">
                <Link to={`/users/${post.author.id}`} className="w-12 h-12 overflow-hidden rounded-full shadow">
                    <img src={post.author.pic ? post.author.pic : 'img/default-pic.png'} alt={post.author.name} />
                </Link>
                <div className="grow">
                    <Link to={`/posts/${post._id}`} className="text-lg font-bold">{post.title}</Link>
                    <div className="flex justify-between items-center">
                        <Link to={`/users/${post.author.id}`}>{post.author.name}</Link>
                        <p className="italic text-sm">{formatDistanceToNow(Date.parse(post.createdAt))} ago</p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default PostPreview