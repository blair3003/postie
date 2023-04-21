const Footer = () => {
    return (
        <footer className="grid place-content-center bg-slate-800 p-4">
            <p className="text-white"><span className="font-pacifico">Postie</span> &copy; {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer