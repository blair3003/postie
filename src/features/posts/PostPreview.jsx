import { Link } from 'react-router-dom'

const PostPreview = ({ post }) => {

    return (
        <article className="">
            <Link to={`/posts/${post._id}`}>
                <div className="bg-white p-4 rounded-lg">
                    <img className="w-full" src={post.thumbnail ? post.thumbnail : 'img/default-thumbnail.png'} alt={post.title} />
                </div>
                <div className="flex gap-4 p-4">
                    <div className="w-12">
                        <img className="rounded-full drop-shadow" src={post.author.pic ? post.author.pic : 'img/default-pic.png'} alt={post.author.name} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">{post.title}</h3>
                        <p>{post.author.name}</p>
                        <p>{post.createdAt}</p>
                    </div>
                </div>  
            </Link>
        </article>
    )
}

export default PostPreview