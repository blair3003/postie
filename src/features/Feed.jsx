import { useState, useEffect, useRef } from 'react'
import { useApplicationContext } from '../app/store'
import Loading from '../components/Loading'
import PostPreview from './posts/PostPreview'

const Feed = () => {

    const ready = useRef(true)
    const {
        getFetch,
        loading,
        error
    } = useApplicationContext()
    const [posts, setPosts] = useState([])    

    const handleGetPosts = async () => {
        const data = await getFetch({ url: 'posts' })
        if (data) setPosts(data)
    }    

    useEffect(() => {
        if (ready.current) {
            handleGetPosts()
            return () => ready.current = false
        }
    }, [])

    return (
        error ? <p>Error loading feed!</p> :
        loading ? <Loading /> :
        
        <section id="feed">
            <h1 className="offscreen">Feed</h1>
            {posts.length ?
            <div className="auto-grid gap-8">
                {posts.map(post => <PostPreview key={post._id} post={post} />)}
            </div> : null }
        </section>
    )
}

export default Feed 