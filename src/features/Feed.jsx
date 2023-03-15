import { useState, useEffect, useRef } from 'react'
import { useApplicationContext } from '../app/store'
import PostPreview from './posts/PostPreview'

const Feed = () => {

    const [posts, setPosts] = useState()

    const { getPosts, loading, error } = useApplicationContext()

    const handleGetPosts = async () => {
        const data = await getPosts()
        if (data) setPosts(data)
    }

    const ready = useRef(true)

    useEffect(() => {
        if (ready.current) {
            handleGetPosts()
            return () => ready.current = false
        }
    }, [])

    return (
        <section id="feed">
            <h2 className="offscreen">Feed</h2>
            <div className="auto-grid">
                {loading ? <p>Loading...</p> :
                error ? <p>Error loading posts!</p> : 
                posts ? posts.map(post => <PostPreview key={post._id} post={post} />) : null}
            </div>
        </section>
    )
}

export default Feed