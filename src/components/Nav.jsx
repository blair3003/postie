import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Nav = ({ className }) => {

    const user = useAuth()

    return (
        user.id ?
        
        <nav className={className}>
            <Link to="#" className="hover:text-white">Logout</Link>
            <Link to="/posts/create" className="hover:text-white">Create</Link>
        </nav> :
        
        <nav className={className}>
            <Link to="/login" className="hover:text-white">Login</Link>
            <Link to="/register" className="hover:text-white">Register</Link>
        </nav>
    )
}

export default Nav