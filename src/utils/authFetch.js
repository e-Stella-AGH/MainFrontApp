import {jwtUtils} from "./jwt/jwtUtils";
import {loginAPI} from "./apis/LoginAPI";

export const authFetch = (url, data) => {
    const authToken = jwtUtils.getAuthToken()
    const dataHeaders = data?.headers
    const authHeaders = authToken ? {[loginAPI.jwtTokenKey]: authToken} : {}
    const newHeaders = dataHeaders ? Object.assign(dataHeaders, authHeaders) : authHeaders
    const authData = Object.assign(data || {}, {headers: newHeaders})
    return fetch(url, authData).then(response => {
        if(response.status >= 200 && response.status < 300)
            return response
        else {
            localStorage.removeItem(loginAPI.authTokenStorageKey)
            return jwtUtils.refreshToken().then(() => {
                authData.headers[loginAPI.jwtTokenKey] = jwtUtils.getAuthToken()
                return fetch(url, authData).then(response => {
                    if (response.status < 200 || response.status >= 300) {
                        localStorage.removeItem(loginAPI.refreshTokenStorageKey)
                        window.location.reload()
                    }
                    return response
                })
            })
        }
    })
}