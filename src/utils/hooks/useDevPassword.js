import {encodeBase64} from './Base64'

export const useDevPassword = () => {

    const devPasswordKey = "devPassword"

    const setDevPassword = (password) => sessionStorage.setItem(devPasswordKey, password)

    const getDevPassword = () => sessionStorage.getItem(devPasswordKey)

    const getEncodedDevPassword = () => {
        const password = getDevPassword()
        return password ? encodeBase64(password) : ''
    }

    const deleteDevPassword = () => sessionStorage.removeItem(devPasswordKey)

    return {getDevPassword, setDevPassword, getEncodedDevPassword, deleteDevPassword}

}