import useAuth from '../hooks/useAuth'

const Nav = ({ className }) => {

    const user = useAuth()

    return (
        user.id ?
        
        <nav className={className}>
            <a href="#" className="hover:text-white">Logout</a>
        </nav> :
        
        <nav className={className}>
            <a href="/login" className="hover:text-white">Login</a>
            <a href="/register" className="hover:text-white">Register</a>
        </nav>
    )
}

export default Nav