import { useLocation, NavLink } from 'react-router-dom'
import { useApplicationContext } from '../app/store'

const Nav = ({ className }) => {

    const { user } = useApplicationContext()
    const location = useLocation()

    return (
        user ?
        
        <nav className={className}>
            <NavLink to="/logout">Logout</NavLink>
            <NavLink to={`/users/${user.id}`}>Profile</NavLink>
            <NavLink to="/posts/create">Create</NavLink>
        </nav> :
        
        <nav className={className}>
            <NavLink to="/login" state={{ from: location }}>Login</NavLink>
            <NavLink to="/register">Register</NavLink>
        </nav>
    )
}

export default Nav