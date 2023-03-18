import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Auth = ({ roles }) => {

    const user = useAuth()
    const location = useLocation()

    return (
        user.roles.some(role => roles.includes(role))
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default Auth