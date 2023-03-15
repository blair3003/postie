import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'

const PostEdit = () => {

    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [body, setBody] = useState('')
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [authorId, setAuthorId] = useState("6407970a85841dc03653c00c")

    const ready = useRef(true)

    const navigate = useNavigate()

    const { getPost, updatePost, deletePost, loading, error, setError } = useApplicationContext()

    const valid = [id, title, body, authorId].every(Boolean)

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

    const handleDeletePost = async (e) => {
        e.preventDefault()
        if (confirm('Please confirm you would like to delete this post.')) {
            console.log(`Deleting`)
            const deleted = await deletePost({id})
            if (deleted && !error) {
                navigate('/posts')
            }   
        }
    }

    const handleUpdatePost = async (e) => {
        e.preventDefault()
        if (!valid) return
        const updated = await updatePost({
            id,
            title,
            thumbnail,
            body,
            tags,
            authorId
        })
        if (updated && !error) {
            navigate(`/posts/${updated._id}`)
        }        
    }

    const handleGetPost = async () => {
        const data = await getPost(id)
        if (data) {
            if (data.title) setTitle(data.title)
            if (data.thumbnail) setThumbnail(data.thumbnail)
            if (data.body) setBody(data.body)
            if (data.tags) setTags(data.tags)
        }
    }

    useEffect(() => {
        if (ready.current) {
            handleGetPost()
            return () => ready.current = false
        }
    }, [])

    useEffect(() => {
        if (error) {
            setError(false)
            navigate('/404')
        }
    }, [error])
    
    return (
        <form onSubmit={handleUpdatePost} className="flex flex-col gap-4 max-w-3xl bg-red-900/50 p-4 rounded-lg text-black">
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
                    <button type="button" onClick={handleAddTag} disabled={loading} className="p-4 hover:bg-yellow-500 text-black rounded-full w-12 h-12 flex justify-center items-center text-xl font-bold">
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>
            <button type="submit" disabled={loading} className="p-4 bg-black hover:bg-yellow-500 text-white hover:text-black rounded-lg leading-none">
                {loading ? <AiOutlineLoading3Quarters className="mx-auto" /> : "Update"}
            </button>
            <button type="button" disabled={loading} onClick={handleDeletePost} className="p-4 bg-gray-500 hover:bg-yellow-500 text-black hover:text-black rounded-lg leading-none">
                {loading ? <AiOutlineLoading3Quarters className="mx-auto" /> : "Delete"}
            </button>
        </form>
    )
}

export default PostEdit