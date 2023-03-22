import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import CommentCreate from './CommentCreate'
import { useApplicationContext } from '../app/store'

const Comment = ({ post, comment, depth }) => {

    const [toggle, setToggle] = useState(false)
    const { user } = useApplicationContext()

    return (
        <div className="flex gap-2 pb-2">
            <div className="w-8">
                <img className="rounded-full drop-shadow" src={comment.author.pic ? post.author.pic : '/img/default-pic.png'} alt={comment.author.name} />
            </div>
            <div className="grow">
                <div className="flex items-center gap-2">
                    <p className="font-bold">{comment.author.name}</p>
                    <p>{formatDistanceToNow(Date.parse(comment.createdAt))} ago</p>
                </div>
                <div className="pb-2">
                    <p>{comment.body}</p>
                </div>
                {user ?
                <div className="flex items-center">
                    <button onClick={() => setToggle(prev => !prev)}className="text-sm hover:text-white">Reply</button>
                </div> : null}
                {toggle && user ? <CommentCreate post={post} parent={comment} /> : null}
            </div>
        </div>
    )
    
    

}

export default Comment