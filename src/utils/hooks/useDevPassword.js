import { encode } from './Base64'

export const useDevPassword = () => {

    const devPasswordKey = "devPassword"

    const set = (password) => sessionStorage.setItem(devPasswordKey, password)

    const get = () => sessionStorage.getItem(devPasswordKey)

    const getEncoded = () => encode(sessionStorage.getItem(devPasswordKey))

    return {get, set, getEncoded}

}