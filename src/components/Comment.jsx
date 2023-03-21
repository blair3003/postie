const Comment = ({ comment, depth }) => {

    return `${comment.body}, depth: ${depth}`
}

export default Comment