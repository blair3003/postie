import { useApplicationContext } from '../app/store'
import PostPreview from './posts/PostPreview'

const Feed = () => {

    const { posts, loading, error } = useApplicationContext()

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