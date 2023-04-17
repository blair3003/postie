import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <main className="grow bg-red-50 text-black">
            <Outlet />
        </main>
    )
}

export default Main