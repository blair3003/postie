import { useLocation, NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Nav = ({ className }) => {

    const user = useAuth()
    const location = useLocation()

    return (
        user.id ?
        
        <nav className={className}>
            <NavLink to="#">Logout</NavLink>
            <NavLink to="/posts/create">Create</NavLink>
        </nav> :
        
        <nav className={className}>
            <NavLink to="/login" state={{ from: location }}>Login</NavLink>
            <NavLink to="/register">Register</NavLink>
        </nav>
    )
}

export default Nav