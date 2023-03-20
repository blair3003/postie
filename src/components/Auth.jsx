import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useApplicationContext } from '../app/store'

const Auth = ({ roles }) => {

    const { user } = useApplicationContext()
    const location = useLocation()

    return (
        user?.roles.some(role => roles.includes(role))
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default Auth