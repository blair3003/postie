import Comment from './Comment'

const Comments = ({ comments }) => {

    return (
        <ol>
        {comments ? comments.map(comment =>
            <Comment comment={comment} />
        ) : null}
        </ol>
    )
}

export default Comments