const useRegex = () => {

	const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_' ]{0,23}$/
    const EMAIL_REGEX = /^.+@.+\.[a-zA-Z]{2,}$/
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"£$%^&*()\-_=+{}[\]'@#~?/\\|,.<>]).{8,24}$/

	return {
		NAME_REGEX,
		EMAIL_REGEX,
		PASSWORD_REGEX
	}
}

export default useRegex