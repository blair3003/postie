import { useLocation, NavLink } from 'react-router-dom'
import { useApplicationContext } from '../app/store'

const Nav = ({ innerRef, className }) => {

    const { user } = useApplicationContext()
    const location = useLocation()

    return (
        user ?
        
        <nav ref={innerRef} className={className}>
            <NavLink to="/posts/create">Create</NavLink>
            <NavLink to={`/users/${user.id}`}>Profile</NavLink>
            <NavLink to="/logout">Logout</NavLink>
        </nav> :
        
        <nav ref={innerRef} className={className}>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
        </nav>
    )
}

export default Nav