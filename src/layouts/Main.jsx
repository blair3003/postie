import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <main className="grow">
            <Outlet />
        </main>
    )
}

export default Main