import { encodeBase64 } from './Base64'

export const useDevPassword = () => {

    const devPasswordKey = "devPassword"

    const set = (password) => sessionStorage.setItem(devPasswordKey, password)

    const get = () => sessionStorage.getItem(devPasswordKey)

    const getEncoded = () => encodeBase64(sessionStorage.getItem(devPasswordKey))

    return {get, set, getEncoded}

}