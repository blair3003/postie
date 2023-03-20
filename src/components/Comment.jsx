const Comment = ({ comment }) => {

    return (
        <li>{comment ? comment.body : null}</li>
    )
}

export default Comment