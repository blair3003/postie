import { useState } from 'react'
import { useApplicationContext } from '../../app/store'

const Register = () => {

    const { registerUser, loading, error } = useApplicationContext()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const valid = [name, email, password].every(Boolean)

    const handleNameChange = e => setName(e.target.value)
    const handleEmailChange = e => setEmail(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)
    const handleConfirmChange = e => setConfirm(e.target.value)

    const handleRegister = async e => {
        e.preventDefault()
        if (!valid) return
        const user = await registerUser({
            name,
            email,
            password
        })
        if (user && !error) {
            // navigate(`/users/${user._id}`)
            console.log(`Registered user! - ${user.name}`)
        }        
    }

    return (
        <form onSubmit={handleRegister} className="flex flex-col gap-4 max-w-3xl bg-red-900/50 p-4 rounded-lg text-black">

            <label htmlFor="name" className="offscreen">Name:</label>
            <input
                type="text"
                id="name"
                placeholder="Name"
                className="rounded-lg p-4"
                required
                value={name}
                onChange={handleNameChange}
            />

            <label htmlFor="email" className="offscreen">Email:</label>
            <input
                type="email"
                id="email"
                placeholder="Email"
                className="rounded-lg p-4"
                required
                value={email}
                onChange={handleEmailChange}
            />

            <label htmlFor="password" className="offscreen">Password:</label>
            <input
                type="password"
                id="password"
                placeholder="Password"
                className="rounded-lg p-4"
                required
                value={password}
                onChange={handlePasswordChange}
            />

            <label htmlFor="confirm" className="offscreen">Confirm Password:</label>
            <input
                type="password"
                id="confirm"
                placeholder="Confirm Password"
                className="rounded-lg p-4"
                required
                value={confirm}
                onChange={handleConfirmChange}
            />

            <button type="submit" className="p-4 bg-black hover:bg-yellow-500 text-white hover:text-black rounded-lg">Register</button>

        </form>
    )
}

export default Register