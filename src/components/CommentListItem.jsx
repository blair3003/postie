import Comment from './Comment'
import CommentList from './CommentList'

const CommentListItem = ({ post, comment, depth }) => {

    return (
        <li className="pb-2">
        {!Array.isArray(comment) ?
            <Comment post={post} comment={comment}/> :
        <>
            <Comment post={post} comment={comment[0]} />
            <CommentList post={post} comments={comment[1]} depth={++depth} />
        </>}        
        </li>
    )
}

export default CommentListItem