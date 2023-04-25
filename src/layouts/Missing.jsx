import { Link } from 'react-router-dom'

const Missing = () => {

	return (
		<article className="max-w-2xl mx-auto bg-white/50 p-4 mb-8 rounded-lg shadow">

			<h1 className="text-2xl font-pacifico p-2">Page missing</h1>
			<p className="p-2">The page you are trying to access doesn't exist...</p>
			<Link to="/" className="font-bold underline p-2">Back to home</Link>

		</article>

	)

}

export default Missing