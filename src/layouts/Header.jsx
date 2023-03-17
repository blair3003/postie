import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import Nav from '../components/Nav'

const Header = () => {

    const [toggle, setToggle] = useState(false)
    const handleToggle = () => setToggle(toggle => toggle ? false : true)

    return (
        <header className="bg-red-700 flex justify-between items-center relative">
            <Link to="/">
                <span className="uppercase text-white text-3xl font-montserrat px-4">Postie</span>
            </Link>
            <button onClick={handleToggle} className="md:hidden text-zinc-100 hover:text-white bg-red-800 p-4 rounded-bl-lg">
                {toggle ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
            <Nav className="hidden md:flex gap-4 text-zinc-100 bg-red-800 p-4 rounded-bl-lg font-montserrat uppercase" />
            {toggle ? <Nav className="md:hidden flex flex-col gap-4 absolute top-full left-0 bg-black text-white w-full p-4 rounded-b-lg menu-appear" /> : null}
        </header>
    )
}

export default Header