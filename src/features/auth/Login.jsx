const Login = () => {

    const handleLogin = async e => {
        e.preventDefault()

        console.log('Logging in...')
    }

    return (
        <section className="max-w-xl mx-auto bg-red-900/50 text-black p-4 rounded-lg">
            <h1 className="text-2xl text-white mb-4">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">

                <button
                    type="submit"
                    className="p-4 bg-black hover:bg-yellow-500 text-white hover:text-black rounded-lg leading-none disabled:hover:bg-black disabled:hover:text-zinc-300 disabled:text-zinc-300 disabled:line-through"
                >Log in</button>
            </form>

        </section>
    )

}

export default Login