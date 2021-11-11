import { encodeBase64 } from './Base64'

export const useDevPassword = () => {

    const devPasswordKey = "devPassword"

    const set = (password) => sessionStorage.setItem(devPasswordKey, password)

    const get = () => sessionStorage.getItem(devPasswordKey)

    const getEncoded = () => {
        const password = get()
        return password ? encodeBase64(password) : ''
    }


    return {get, set, getEncoded}

}