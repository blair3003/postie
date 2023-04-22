import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { useApplicationContext } from '../app/store'
import CommentCreate from './CommentCreate'

const Comment = ({ post, comment }) => {

    const { user } = useApplicationContext()

    const [toggle, setToggle] = useState(false)

    return (
        <div className="flex gap-2">
            <Link to={`/users/${comment.author.id}`} className="w-10 h-10 overflow-hidden rounded-full shadow">
                <img src={comment.author.pic ? comment.author.pic : '/img/default-pic.png'} alt={comment.author.name} />
            </Link>
            <div className="grow">
                <div className="flex flex-wrap items-center">
                    <Link to={`/users/${comment.author.id}`} className="text-sm font-bold mr-2">{comment.author.name}</Link>
                    <p className="italic text-sm">{formatDistanceToNow(Date.parse(comment.createdAt))} ago</p>
                </div>
                <p>{comment.body}</p>

                {user &&
                <button onClick={() => setToggle(prev => !prev)} className="text-sm hover:text-black/90">Reply</button>}

                {toggle && user &&
                <CommentCreate post={post} parent={comment} />}
            </div>
        </div> 
    )
}

export default Comment