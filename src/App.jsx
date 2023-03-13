import { Routes, Route, Navigate } from 'react-router-dom'
import { ApplicationContextProvider } from './app/store'
import Layout from './layouts/Layout'
import Feed from './features/Feed'
import Post from './features/posts/Post'
import PostCreate from './features/posts/PostCreate'

function App() {
    return (
        <ApplicationContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route index element={<Feed />} />

                    <Route path="posts">
                        <Route index element={<Navigate replace to="/" />} />
                        <Route path="create" element={<PostCreate />} />
                        {/* <Route path="edit/:id" element={<PostEdit />} /> */}
                        <Route path=":id" element={<Post />} />
                    </Route>

                </Route>
            </Routes>
        </ApplicationContextProvider>
    )
}

export default App
