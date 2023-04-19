import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import Nav from '../components/Nav'

const Header = () => {

    const menu = useRef(null)
    const { pathname } = useLocation()
    const [toggle, setToggle] = useState(false)

    const close = useCallback((e) => {
        if (toggle && (!menu.current.contains(e.target) || e.target.getAttribute('href') === pathname)) setToggle(false)
    }, [toggle, menu])

    useEffect(() => {
        window.addEventListener('mousedown', close)
        return () => window.removeEventListener('mousedown', close)
    }, [close])

    useEffect(() => {
        setToggle(false)
    }, [pathname])

    return (
        <header className="bg-red-50 flex justify-between items-center relative p-4">
            <Link to="/" className="text-slate-800 text-3xl font-pacifico">Postie</Link>
            <button onClick={() => setToggle(toggle => toggle ? false : true)} className="md:hidden text-slate-800 text-3xl">
                {toggle ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
            <Nav className="hidden md:flex gap-8 text-slate-800 font-pacifico text-xl" />
            {toggle ? <Nav innerRef={menu} className="md:hidden flex flex-col gap-8 w-full absolute top-full left-0 z-10 px-4 py-8 rounded-b-lg menu-appear bg-slate-800 text-white font-pacifico text-xl shadow-xl" /> : null}
        </header>
    )
}

export default Header