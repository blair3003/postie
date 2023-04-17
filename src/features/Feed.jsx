import { useState, useEffect, useRef } from 'react'
import { useApplicationContext } from '../app/store'
import PostPreview from './posts/PostPreview'

const Feed = () => {

    const ready = useRef(true)
    const { getFetch, loading, error } = useApplicationContext()
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
        <section id="feed">
            <h1 className="offscreen">Feed</h1>
            <div className="auto-grid">
                {loading ? <p>Loading...</p> :
                error ? <p>Error loading posts!</p> : 
                posts.length ? posts.map(post => <PostPreview key={post._id} post={post} />) : 'No posts to display.'}
            </div>
        </section>
    )
}

export default Feed