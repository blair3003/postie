import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <main className="grow bg-red-700 text-white p-4">
            <Outlet />
        </main>
    )
}

export default Main