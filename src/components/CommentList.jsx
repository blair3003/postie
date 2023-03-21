import CommentListItem from './CommentListItem'

const CommentList = ({ comments, depth = 0 }) => {

    return (
        <ol className={depth ? "pl-4" : null}>
        {comments.map((comment, index) =>
            <CommentListItem key={index} comment={comment} depth={depth} />
        )}
        </ol>
    )
}

export default CommentList