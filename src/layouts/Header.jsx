import { Link } from 'react-router-dom'
import Menu from '../components/Menu'

const Header = () => {

    return (
        <header className="bg-red-700 p-4 flex justify-between items-center">
            <Link to="/">
                <h1 className="uppercase text-white text-3xl font-montserrat">Postie</h1>
            </Link>
            <Menu />
        </header>
    )
}

export default Header