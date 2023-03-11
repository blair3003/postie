import { Routes, Route } from 'react-router-dom'
import { ApplicationContextProvider } from './app/store'
import Layout from './layouts/Layout'
import Feed from './features/Feed'

function App() {
    return (
        <ApplicationContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>

                    <Route index element={<Feed />} />

                </Route>
            </Routes>
        </ApplicationContextProvider>
    )
}

export default App
