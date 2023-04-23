import MoonLoader from 'react-spinners/MoonLoader'

const Loading = () => {

    return (
        <div className="grid place-content-center absolute inset-0">
            <MoonLoader
                color="#1e293b"
                loading
                cssOverride={{
                    display: 'block',
                    margin: '0 auto'
                }}
                size={30}
                aria-label="Loading Spinner"
            />
        </div>
    )

}

export default Loading