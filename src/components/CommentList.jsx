import { useState } from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

import CommentListItem from './CommentListItem'

const CommentList = ({ post, comments, depth = 0 }) => {

    const [toggle, setToggle] = useState(depth ? false : true) 

    return (
        <>
        {depth ?
        <div className="ml-6 mb-2 px-4 py-2 hover:bg-red-900 rounded-full inline-block">
            <button className="text-sky-600 font-bold flex items-center" onClick={() => setToggle(prev => !prev)}>{toggle ? <AiFillCaretUp /> : <AiFillCaretDown />} {comments.length === 1 ? '1 reply' : comments.length + ' replies'}</button>
        </div> : null}
        {toggle ?
        <ol className={depth ? "pl-10" : null}>
        {comments.map((comment, index) =>
            <CommentListItem key={index} post={post} comment={comment} depth={depth} />
        )}
        </ol> : null}
        </>
    )
}

export default CommentList