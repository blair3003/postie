import Comment from './Comment'
import CommentList from './CommentList'

const CommentListItem = ({ comment, depth }) => {

    return (
        <li>
        {!Array.isArray(comment) ?
            <Comment comment={comment} depth={depth}/> :
        <>
            <Comment comment={comment[0]} depth={depth} />
            <CommentList comments={comment[1]} depth={++depth} />
        </>}        
        </li>
    )
}

export default CommentListItem