import { useState } from 'react'

const PostCreate = () => {

    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [body, setBody] = useState('')
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [author, setAuthor] = useState({
        id: "6407970a85841dc03653c00c",
        name: "Blair"
    })

    const handleTitleChange = e => setTitle(e.target.value)
    const handleThumbnailChange = e => setThumbnail(e.target.value)
    const handleBodyChange = e => setBody(e.target.value)
    const handleTagChange = e => setTag(e.target.value)

    const handleAddTag = e => {
        e.preventDefault()
        if (tag && !tags.includes(tag)) {
            setTags(tags => [...tags, tag])
        }
        setTag('')
    }

    const handleRemoveTag = e => {
        setTags(tags => tags.filter(tag => tag !== e.target.textContent))
    }

    const handleSubmitPost = async (e) => {
        console.log(`submitting`)
        e.preventDefault()
    }
    
    return (
        <form onSubmit={handleSubmitPost} className="flex flex-col gap-4 max-w-3xl bg-red-900/50 p-4 rounded-lg text-black">
            <label htmlFor="title" className="offscreen">Title:</label>
            <input
                id="title"
                type="text"
                placeholder="Title"
                required
                className="rounded-lg p-4"
                value={title}
                onChange={handleTitleChange}
            />
            <label htmlFor="thumbnail" className="offscreen">Thumbnail:</label>
            <input
                id="thumbnail"
                type="text"
                placeholder="Thumbnail"
                className="rounded-lg p-4"
                value={thumbnail}
                onChange={handleThumbnailChange}
            />
            <label htmlFor="body" className="offscreen">Body:</label>
            <textarea
                id="body"
                placeholder="Body"
                rows="4"
                required
                className="rounded-lg p-4"
                value={body}
                onChange={handleBodyChange}
            ></textarea>
            <div>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                    <h3 className="text-white text-xl font-montserrat uppercase">Tags:</h3>
                    {tags ? tags.map(tag => (
                        <span key={tag} onClick={handleRemoveTag} className="px-4 bg-yellow-500 text-black rounded-full cursor-pointer">{tag}</span>
                    )) : null}
                </div>
                
                <div className="flex bg-white rounded-lg p-1 max-w-xs gap-1">
                    <label htmlFor="tag" className="offscreen">Add tag:</label>
                    <input
                        type="text"
                        id="tag"
                        placeholder="New tag"
                        className="rounded-lg grow px-3"
                        value={tag}
                        onChange={handleTagChange}
                    />
                    <button type="button" onClick={handleAddTag} className="p-4 bg-yellow-500 text-black rounded-lg w-12 h-12 grid content-center">+</button>
                </div>
            </div>
            <button type="submit" className="p-4 bg-black text-white rounded-lg">Post</button>
        </form>
    )
}

export default PostCreate