import jwtDecode from 'jwt-decode'
import { useApplicationContext } from '../app/store'

const useAuth = () => {
    
    const user = {
        id: '',
        name: '',
        email: '',
        pic: '',
        roles: []
    }

    const { token } = useApplicationContext()

    if (token) {
        const { id, name, email, pic, roles } = jwtDecode(token).user
        user.id = id
        user.name = name
        user.email = email
        user.pic = pic
        user.roles = roles
    }

    return user
}

export default useAuth