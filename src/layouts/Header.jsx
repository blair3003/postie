import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import Nav from '../components/Nav'

const Header = () => {

    const [toggle, setToggle] = useState(false)

    return (
        <header className="bg-red-700 p-4 flex justify-between items-center relative">
            <Link to="/">
                <h1 className="uppercase text-white text-3xl font-montserrat">Postie</h1>
            </Link>
            <button onClick={() => setToggle(toggle => toggle ? false : true)} className="md:hidden">
                {toggle ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
            <Nav className="hidden md:flex gap-4" />
            {toggle ? <Nav className="md:hidden flex flex-col gap-4 absolute top-full" /> : null}
        </header>
    )
}

export default Header