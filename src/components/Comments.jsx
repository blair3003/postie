import Comment from './Comment'

const Comments = ({ comments }) => {

    // Sort comments by age and depth
    const sorted = []
    comments.sort((a, b) => Date.parse(a.createdAt) > Date.parse(b.createdAt))
    comments.forEach(comment => {
        if (comment.parent) {
            let index = sorted.findIndex(parent => parent._id === comment.parent)
            sorted.splice(++index, 0, comment)
        } else sorted.unshift(comment)
    })





    return (
        <ol>
        {sorted.map(comment =>
            <Comment key={comment._id} comment={comment} />
        )}
        </ol>
    )
}

export default Comments