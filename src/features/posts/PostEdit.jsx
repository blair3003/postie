import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'
import useTitle from '../../hooks/useTitle'

const PostEdit = () => {

    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [authorId, setAuthorId] = useState('')

    const ready = useRef(true)

    const navigate = useNavigate()

    const { getFetch, loading, error, user } = useApplicationContext()

    

    const valid = [id, title, body].every(Boolean)

    const handleTitleChange = e => setTitle(e.target.value)
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
            const data = await getFetch({
                url: 'posts',
                method: 'DELETE',
                auth: true,
                body: { id }
            })
            if (data.deleted && !error) {
                navigate('/posts')
            }   
        }
    }

    const handleUpdatePost = async (e) => {
        e.preventDefault()
        if (!valid) return
        const data = await getFetch({
            url: 'posts',
            method: 'PATCH',
            auth: true,
            body: {
                id,
                title,
                body,
                tags,
                authorId
            }
        })
        if (data.updated && !error) {
            navigate(`/posts/${data.updated._id}`)
        }        
    }

    const handleGetPost = async () => {
        const data = await getFetch({ url: `posts/${id}` })
        if (data) {
            const canEdit = user?.roles.includes('admin') || user?.id === data?.author.id
            if (!canEdit) navigate(`/posts/${id}`)
            setTitle(data.title)
            setBody(data.body)
            setTags(data.tags)
            setAuthorId(data.author.id)
        }
    }

    useEffect(() => {
        if (ready.current) {
            handleGetPost()
            return () => ready.current = false
        }
    }, [])

    useTitle('Edit post')
    
    return (
        <section className="max-w-xl mx-auto bg-red-900/50 text-black p-4 rounded-lg">
            <h1 className="text-2xl text-white mb-4">Edit Post</h1>
            <form onSubmit={handleUpdatePost} className="flex flex-col gap-4">
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
        </section>
    )
}

export default PostEdit