import { Routes, Route, Navigate } from 'react-router-dom'
import { ApplicationContextProvider } from './app/store'
import Layout from './layouts/Layout'
import Missing from './layouts/Missing'
import Feed from './features/Feed'
import Post from './features/posts/Post'
import PostCreate from './features/posts/PostCreate'
import PostEdit from './features/posts/PostEdit'
import Register from './features/auth/Register'

function App() {
    return (
        <ApplicationContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route index element={<Feed />} />

                    <Route path="posts">
                        <Route index element={<Navigate replace to="/" />} />
                        <Route path="create" element={<PostCreate />} />
                        <Route path=":id">
                            <Route index element={<Post />} />
                            <Route path="edit" element={<PostEdit />} />
                        </Route>
                    </Route>

                    <Route path="register" element={<Register />} />

                    <Route path="404" element={<Missing />} />
                    <Route path="*" element={<Navigate replace to="/404" />} />

                </Route>
            </Routes>
        </ApplicationContextProvider>
    )
}

export default App
