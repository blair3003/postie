import Comment from './Comment'
import CommentList from './CommentList'

const CommentListItem = ({ post, comment, depth }) => {

    return (
        <li>
        {!Array.isArray(comment) ?
            <Comment post={post} comment={comment} depth={depth}/> :
        <>
            <Comment post={post} comment={comment[0]} depth={depth} />
            <CommentList post={post} comments={comment[1]} depth={++depth} />
        </>}        
        </li>
    )
}

export default CommentListItem