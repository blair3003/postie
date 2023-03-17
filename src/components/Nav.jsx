const Nav = ({ className }) => {

    return (
        <nav className={className}>
            <a href="#" className="hover:text-white">Login</a>
            <a href="/register" className="hover:text-white">Register</a>
        </nav>
    )
}

export default Nav