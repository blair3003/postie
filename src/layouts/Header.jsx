import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-red-700 p-4">
            <Link to="/">
                <h1 className="uppercase text-white text-3xl font-montserrat">Postie</h1>
            </Link>
        </header>
    )
}

export default Header