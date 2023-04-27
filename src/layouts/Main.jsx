import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <main className="grow bg-red-50 text-black p-4">
            <Outlet />
        </main>
    )
}

export default Main