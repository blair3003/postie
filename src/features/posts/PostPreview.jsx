import { Link } from 'react-router-dom'

const PostPreview = ({ post }) => {

    return (
        <article className="bg-white p-4 rounded-lg m-4 shadow">
            <Link to={`/posts/${post._id}`} className="">
                <div className="overflow-hidden aspect-video">
                    <img className="rounded-lg" src={post.thumbnail ? post.thumbnail : 'img/default-thumbnail.png'} alt={post.title} />
                </div>
                <div className="flex gap-4 mt-4">
                    <div className="w-12">
                        <img className="rounded-full drop-shadow" src={post.author.pic ? post.author.pic : 'img/default-pic.png'} alt={post.author.name} />
                    </div>
                    <div className="grow">
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