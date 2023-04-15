const useFormData = (obj) => {
	const formData = new FormData()
	Object.keys(obj).forEach(key => {
		if (obj[key]) formData.append(key, obj[key])
	})
	return formData
}

export default useFormData