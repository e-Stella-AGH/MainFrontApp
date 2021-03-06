import {jwtUtils} from "./jwt/jwtUtils";
import {loginAPI} from "./apis/LoginAPI";
import {checkedFetch} from "./chekedFetch";
import Swal from "sweetalert2";

export const authFetch = (url, data, errorMessage) => {
    const authToken = jwtUtils.getAuthToken()
    const dataHeaders = data?.headers
    const authHeaders = authToken ? {[loginAPI.jwtTokenKey]: authToken} : {}
    const newHeaders = dataHeaders ? Object.assign(dataHeaders, authHeaders) : authHeaders
    const authData = Object.assign(data || {}, {headers: newHeaders})
    return checkedFetch(url, authData, errorMessage)
        .catch(httpError => {
            if(httpError.code === 401)
                jwtUtils.refreshToken().then(() => {
                    authData.headers[loginAPI.jwtTokenKey] = jwtUtils.getAuthToken()
                    return checkedFetch(url, authData, errorMessage)
                        .catch(httpError => {
                            if(httpError.code === 401) {
                                localStorage.removeItem(loginAPI.refreshTokenStorageKey)
                                localStorage.removeItem(loginAPI.authTokenStorageKey)
                                Swal.fire({
                                    text: "Your session expired. We will take you to our login page!",
                                    icon: "warning"
                                })
                                .then(() => {
                                    window.history.pushState({urlPath: "/#/login"}, "", "/#/login")
                                    window.location.reload()
                                })
                            } else {
                                throw httpError
                            }
                        })
                })
            else {
                throw httpError
            }
        })
}