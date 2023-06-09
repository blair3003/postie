import { Routes, Route, Navigate } from 'react-router-dom'
import { ApplicationContextProvider } from './app/store'
import Layout from './layouts/Layout'
import Missing from './layouts/Missing'
import Feed from './features/Feed'
import Post from './features/posts/Post'
import PostCreate from './features/posts/PostCreate'
import PostEdit from './features/posts/PostEdit'
import Login from './features/auth/Login'
import Logout from './features/auth/Logout'
import Register from './features/auth/Register'
import Profile from './features/auth/Profile'
import ProfileEdit from './features/auth/ProfileEdit'
import Auth from './components/Auth'
import useTitle from './hooks/useTitle'

function App() {
    useTitle('Postie')

    return (
        <ApplicationContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route index element={<Feed />} />

                    <Route path="posts">
                        <Route index element={<Navigate to="/" replace/>} />
                        <Route element={<Auth roles={['admin', 'author']}/>}>
                            <Route path="create" element={<PostCreate />} />
                        </Route>
                        <Route path=":id">
                            <Route index element={<Post />} />
                            <Route element={<Auth roles={['admin', 'author']} />}>
                                <Route path="edit" element={<PostEdit />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route path="users">
                        <Route index element={<Navigate to="/" replace/>} />
                        <Route path=":id">
                            <Route index element={<Profile />} />
                            <Route element={<Auth roles={['admin', 'author']} />}>
                                <Route path="edit" element={<ProfileEdit />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="register" element={<Register />} />

                    <Route path="*" element={<Missing />} />
                </Route>
            </Routes>
        </ApplicationContextProvider>
    )
}

export default App
