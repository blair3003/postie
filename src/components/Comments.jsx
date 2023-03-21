import CommentList from './CommentList'

const Comments = ({ comments }) => {

    // Sort comments, newest first
    comments.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

    // Define function to recursively sort comments into multidimensional array
    const recurse = (parent) => {
        const children = comments.filter(comment => comment.parent === parent._id)
        if (!children.length) return parent
        return [
            parent,
            children.map(child => recurse(child))
        ]
    }

    // Create sorted comments array starting with top-level comments
    const sorted = comments
                    .filter(comment => !comment.parent)
                    .map(comment => recurse(comment))

    return <CommentList comments={sorted} />
}

export default Comments