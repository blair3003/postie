import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'

const PostCreate = () => {

    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [body, setBody] = useState('')
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [authorId, setAuthorId] = useState("6407970a85841dc03653c00c")

    const navigate = useNavigate()

    const { createPost, loading, error } = useApplicationContext()

    const valid = [title, body, authorId].every(Boolean)

    const handleTitleChange = e => setTitle(e.target.value)
    const handleThumbnailChange = e => setThumbnail(e.target.value)
    const handleBodyChange = e => setBody(e.target.value)
    const handleTagChange = e => setTag(e.target.value)

    const handleAddTag = e => {
        e.preventDefault()
        if (tag && !tags.includes(tag.toLowerCase())) {
            setTags(tags => [...tags, tag.toLowerCase()])
        }
        setTag('')
    }

    const handleRemoveTag = e => {
        setTags(tags => tags.filter(tag => tag !== e.target.textContent))
    }

    const handleSubmitPost = async (e) => {
        e.preventDefault()
        if (!valid) return
        const post = await createPost({
            title,
            thumbnail,
            body,
            tags,
            authorId
        })
        if (post && !error) {
            navigate(`/posts/${post._id}`)
        }        
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
                        <div key={tag} onClick={handleRemoveTag} className="px-3 pb-1 bg-yellow-500 text-black rounded-full cursor-pointer">{tag}</div>
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
                    <button type="button" disabled={loading} onClick={handleAddTag} className="p-4 hover:bg-yellow-500 text-black rounded-full w-12 h-12 flex justify-center items-center text-xl font-bold">
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>
            <button type="submit" disabled={loading} className="p-4 bg-black hover:bg-yellow-500 text-white hover:text-black rounded-lg leading-none">
                {loading ? <AiOutlineLoading3Quarters className="mx-auto" /> : "Post"}
            </button>
        </form>
    )
}

export default PostCreate