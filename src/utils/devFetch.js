import {checkedFetch} from "./chekedFetch";

const devPasswordHeaderKey = "x-dev-password"

export const devFetch = (url, data, encodedDevPassword, errorMessage) => {
    const dataHeaders = data?.headers
    const authHeaders = {[devPasswordHeaderKey]: encodedDevPassword}
    const newHeaders = dataHeaders ? Object.assign(dataHeaders, authHeaders) : authHeaders
    const authData = Object.assign(data || {}, {headers: newHeaders})
    return checkedFetch(url, authData, errorMessage)
}