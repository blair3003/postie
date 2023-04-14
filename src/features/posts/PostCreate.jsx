import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'

const PostCreate = () => {

    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [body, setBody] = useState('')
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [authorId, setAuthorId] = useState('')

    const navigate = useNavigate()

    const { createPost, loading, error, user, getFetch } = useApplicationContext()

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
        if (![title, thumbnail, body, authorId].every(Boolean)) return
        // const post = await createPost({
        //     title,
        //     thumbnail,
        //     body,
        //     tags,
        //     authorId
        // })

        const response = await getFetch({
            url: 'posts',
            method: 'POST',
            auth: true,
            body: {
                title,
                thumbnail,
                body,
                tags,
                authorId
            }
        })

        if (response && !error) {
            navigate(`/posts/${response.post._id}`)
        }        
    }

    useEffect(() => {
        if (user) setAuthorId(user.id)
    }, [user])
    
    return (
        <section className="max-w-xl mx-auto bg-red-900/50 text-black p-4 rounded-lg">
            <h1 className="text-2xl text-white mb-4">Create Post</h1>
            <form onSubmit={handleSubmitPost} className="flex flex-col gap-4">
                <label htmlFor="title" className="offscreen">Title:</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Title"
                    required
                    className="rounded-lg p-4"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor="thumbnail" className="offscreen">Thumbnail:</label>
                <input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    required
                    className="rounded-lg p-4"
                    onChange={e => setThumbnail(e.target.files[0])}
                />
                <label htmlFor="body" className="offscreen">Body:</label>
                <textarea
                    id="body"
                    placeholder="Body"
                    rows="4"
                    required
                    className="rounded-lg p-4"
                    value={body}
                    onChange={e => setBody(e.target.value)}
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
                            onChange={e => setTag(e.target.value)}
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
        </section>
    )
}

export default PostCreate