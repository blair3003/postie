const PostCreate = () => {
    
    return (
        <form action="" method="POST" className="flex flex-col gap-4 max-w-3xl bg-red-900/50 p-4 rounded-lg text-black">
            <label htmlFor="title" className="offscreen">Title:</label>
            <input type="text" id="title" name="title" placeholder="Title" required className="rounded-lg p-4"/>
            <label htmlFor="thumbnail" className="offscreen">Thumbnail:</label>
            <input type="text" id="thumbnail" name="thumbnail" placeholder="Thumbnail" className="rounded-lg p-4"/>
            <label htmlFor="body" className="offscreen">Body:</label>
            <textarea id="body" name="body" placeholder="Body" rows="4" required className="rounded-lg p-4"></textarea>
            <div>
                <div className="flex items-center gap-2 flex-wrap mb-4">
                    <h3 className="text-white text-xl font-montserrat uppercase">Tags:</h3>
                    <span className="px-4 bg-yellow-500 text-black rounded-full">Tag 1</span>
                    <span className="px-4 bg-yellow-500 text-black rounded-full">Tag 2</span>
                    <span className="px-4 bg-yellow-500 text-black rounded-full">Tag 3</span>
                </div>
                
                <div className="flex bg-white rounded-lg p-1 max-w-xs gap-1">
                    <label htmlFor="tag" className="offscreen">Add tag:</label>
                    <input type="text" id="tag" name="tag" placeholder="New tag" className="rounded-lg grow px-3"/>
                    <button type="button" onSubmit={e => e.preventDefault()} className="p-4 bg-yellow-500 text-black rounded-lg w-12 h-12 grid content-center">+</button>
                </div>
            </div>
            <button type="submit" onSubmit={e => e.preventDefault()} className="p-4 bg-black text-white rounded-lg">Post</button>


        </form>
    )
}

export default PostCreate