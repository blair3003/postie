import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiFillDelete,
         AiFillExclamationCircle,
         AiOutlineLoading3Quarters,
         AiOutlinePlus } from 'react-icons/ai'
import { useApplicationContext } from '../../app/store'
import Loading from '../../components/Loading'
import useTitle from '../../hooks/useTitle'

const PostEdit = () => {

    const navigate = useNavigate()
    const ready = useRef(true)
    const errorRef = useRef()

    const { id } = useParams()
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

    const handleAddTag = e => {
        e.preventDefault()
        if (tag && !tags.includes(tag.toLowerCase())) setTags(tags => [...tags, tag.toLowerCase()])
        setTag('')
    }

    const handleRemoveTag = e => {
        setTags(tags => tags.filter(tag => tag !== e.target.textContent))
    }

    const handleGetPost = async () => {
        const data = await getFetch({ url: `posts/${id}` })
        if (!data) navigate('/')
        if (!user?.roles.includes('admin') && user?.id !== data?.author.id) navigate(`/posts/${id}`)
        setTitle(data.title)
        setThumbnail(data.thumbnail)
        setBody(data.body)
        setTags(data.tags)
        setAuthorId(data.author.id)

    }

    const handleUpdatePost = async (e) => {
        e.preventDefault()
        if (![id, title, body].every(Boolean)) return setError('Missing required fields!')
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
        if (data?.updated && !error) navigate(`/posts/${data.updated._id}`)
    }

    const handleDeletePost = async e => {
        e.preventDefault()
        if (confirm('Please confirm you would like to delete this post.')) {
            const data = await getFetch({
                url: 'posts',
                method: 'DELETE',
                auth: true,
                body: { id }
            })
            if (data?.deleted && !error) navigate('/')
        }
    }

    useEffect(() => {
        if (ready.current) {
            handleGetPost()
            return () => ready.current = false
        }
    }, [])

    useEffect(() => {
        setError('')
    }, [title, body, tags])

    useEffect(() => {
        if (error) errorRef.current.focus()
    }, [error])

    useTitle('Edit post')
    
    return (
        !title ? <Loading /> :

        <section className="max-w-xl mx-auto bg-slate-800 p-4 rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-2 mb-4">
                <h1 className="text-2xl text-white font-pacifico">Delete post</h1>
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleDeletePost}
                    className="text-white text-3xl hover:text-white/90"
                >
                    <AiFillDelete />
                </button>
            </div>

            {error ? <p ref={errorRef} className="bg-red-600 text-white font-bold p-2 mb-4 rounded-lg shadow" aria-live="assertive">
                <AiFillExclamationCircle className="inline mb-1" /> {error}
            </p> : null}

            <form onSubmit={handleUpdatePost} className="flex flex-col gap-4">

                <label htmlFor="title" className="offscreen">Title:</label>
                <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-xl">
                    <input
                        id="title"
                        type="text"
                        placeholder="Title"
                        required
                        className="rounded-lg p-2 grow"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="p-2">
                    <img src={thumbnail} alt={title} className="shadow-xl"/>
                </div>

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
                    {loading ? <AiOutlineLoading3Quarters className="mx-auto animate-spin" /> : 'update'}
                </button>

            </form>
        </section>
    )
}

export default PostEdit