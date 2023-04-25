import { useEffect,
         useRef,
         useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillExclamationCircle,
         AiOutlineLoading3Quarters,
         AiOutlinePlus,
         AiOutlineUpload } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'
import useTitle from '../../hooks/useTitle'

const PostCreate = () => {

    const navigate = useNavigate()
    const titleRef = useRef()
    const errorRef = useRef()

    const {
        user,
        getFetch,
        loading,
        error,
        setError
    } = useApplicationContext()

    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [body, setBody] = useState('')
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState([])
    const [authorId, setAuthorId] = useState('')
    const [preview, setPreview] = useState('')

    const handleAddTag = e => {
        e.preventDefault()
        if (tag && !tags.includes(tag.toLowerCase())) setTags(tags => [...tags, tag.toLowerCase()])
        setTag('')
    }

    const handleRemoveTag = e => {
        setTags(tags => tags.filter(tag => tag !== e.target.textContent))
    }

    const handleSubmitPost = async e => {
        e.preventDefault()
        if (![title, thumbnail, body, authorId].every(Boolean)) return setError('Missing required fields!')
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
        if (response?.post && !error) navigate(`/posts/${response.post._id}`)
    }

    useEffect(() => {
        titleRef.current.focus()
    }, [])

    useEffect(() => {
        if (thumbnail) {
            setPreview(URL.createObjectURL(thumbnail))
        } else setPreview('')
    }, [thumbnail])

    useEffect(() => {
        if (user) setAuthorId(user.id)
    }, [user])

    useEffect(() => {
        setError('')        
    }, [title, thumbnail, body, tags])

    useEffect(() => {
        if (error) errorRef.current.focus()
    }, [error])

    useTitle('Create post')
    
    return (
        <section className="max-w-xl mx-auto bg-slate-800 p-4 rounded-lg shadow-xl">
            <h1 className="text-2xl text-white p-2 mb-4 font-pacifico">Create new post</h1>

            {error ? <p ref={errorRef} className="bg-red-600 text-white font-bold p-2 mb-4 rounded-lg shadow" aria-live="assertive">
                <AiFillExclamationCircle className="inline mb-1" /> {error}
            </p> : null}

            <form onSubmit={handleSubmitPost} className="flex flex-col gap-4">

                <label htmlFor="title" className="offscreen">Title:</label>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-xl">
                    <input
                        id="title"
                        type="text"
                        placeholder="Title"
                        className="rounded-lg p-2 grow"
                        required
                        ref={titleRef}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <label htmlFor="thumbnail" className="flex flex-col gap-2 p-2 cursor-pointer">
                    <div className="flex items-center gap-4">
                        <span className="text-white text-xl font-pacifico mb-1">Thumbnail:</span>
                        {!thumbnail ? <span className="flex justify-center items-center w-10 h-10 bg-teal-600 hover:bg-teal-600/90 text-white text-2xl rounded-full shadow-xl">
                            <AiOutlineUpload />
                        </span> : null}
                    </div>
                    {thumbnail ? <img src={preview} alt={title} className="shadow-xl"/> : null}
                    <input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        className="offscreen"
                        onChange={e => setThumbnail(e.target.files[0])}
                    />
                </label>       

                <label htmlFor="body" className="offscreen">Body:</label>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-xl">
                    <textarea
                        id="body"
                        placeholder="Tell us about this post"
                        rows="4"
                        required
                        className="rounded-lg p-2 grow"
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    ></textarea>
                </div>
        
                <div className="flex items-center gap-2 p-2 flex-wrap">
                    <span className="text-white text-xl font-pacifico mb-2">Tags:</span>
                    {tags.length ? tags.map(tag => (
                        <span
                            key={tag}
                            onClick={handleRemoveTag}
                            className="px-3 bg-yellow-500 hover:bg-yellow-500/90 text-black text-sm rounded-full cursor-pointer"
                        >{tag}</span>
                    )) : null}
                </div>
                    
                <label htmlFor="tag" className="offscreen">Add tag:</label>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-xl">
                    <input
                        type="text"
                        id="tag"
                        placeholder="Add a tag"
                        className="rounded-lg p-2 grow"
                        value={tag}
                        onChange={e => setTag(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={handleAddTag}
                        disabled={!loading ? false : true}
                        className="flex justify-center items-center w-10 h-10 ml-2 text-white text-xl font-bold bg-teal-600 hover:bg-teal-600/90 shadow rounded-full"
                    >
                        <AiOutlinePlus />
                    </button>
                </div>          

                <button
                    type="submit"
                    className="p-4 mb-8 bg-orange-600 hover:bg-orange-600/90 disabled:bg-orange-600/90 text-white font-bold rounded-lg leading-none shadow-xl"
                    disabled={!loading ? false : true}
                >
                    {loading ? <AiOutlineLoading3Quarters className="mx-auto animate-spin" /> : 'post'}
                </button>
            </form>

        </section>
    )
}

export default PostCreate