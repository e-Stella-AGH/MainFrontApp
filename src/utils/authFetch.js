import {jwtUtils} from "./jwt/jwtUtils";
import {loginAPI} from "./apis/LoginAPI";
import {checkedFetch} from "./chekedFetch";

export const authFetch = (url, data, error) => {
    const authToken = jwtUtils.getAuthToken()
    const dataHeaders = data?.headers
    const authHeaders = authToken ? {[loginAPI.jwtTokenKey]: authToken} : {}
    const newHeaders = dataHeaders ? Object.assign(dataHeaders, authHeaders) : authHeaders
    const authData = Object.assign(data || {}, {headers: newHeaders})
    return checkedFetch(url, authData, error)
        .catch(() => jwtUtils.refreshToken().then(() => {
            authData.headers[loginAPI.jwtTokenKey] = jwtUtils.getAuthToken()
            return checkedFetch(url, authData).catch(() => {
                localStorage.removeItem(loginAPI.refreshTokenStorageKey)
                localStorage.removeItem(loginAPI.authTokenStorageKey)
                window.location.reload()
            })
        }))
}