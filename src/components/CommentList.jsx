import { useState } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

import CommentListItem from './CommentListItem'

const CommentList = ({ post, comments, depth = 0 }) => {

    const [toggle, setToggle] = useState(depth ? false : true) 

    return (
        <>
        {depth ?
        <button className="ml-11 my-2 flex items-center gap-1 text-teal-600 hover:text-teal-600/90 font-bold " onClick={() => setToggle(prev => !prev)}>
            {toggle ? <AiFillCaretUp /> : <AiFillCaretDown />}
            {toggle ? 'Hide replies' : (comments.length === 1) ? '1 reply' : comments.length + ' replies'}
        </button> : null}
        {toggle &&
        <ol className={depth ? "pl-10" : null}>
        {comments.map((comment, index) =>
            <CommentListItem key={index} post={post} comment={comment} depth={depth} />
        )}
        </ol>}
        </>
    )
}

export default CommentList