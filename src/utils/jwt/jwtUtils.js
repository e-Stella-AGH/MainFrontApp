import {validateSchema} from "../schemas/validateSchema";
import {tokenPayloadSchema} from "../schemas/tokenPayloadSchema";
import {loginAPI} from "../apis/LoginAPI";
import {jwtAPI} from "../apis/JwtAPI";
import Swal from "sweetalert2";

export const jwtUtils = {
    jwtHeaderKey: "x-jwt",

    getUser: () => {
        const token = jwtUtils.getAuthToken()
        const possiblyUser = jwtUtils.getPayload(token)

        return jwtUtils.payloadToOptUser(possiblyUser)
    },

    getAuthToken: () => localStorage.getItem(loginAPI.authTokenStorageKey),
    getRefreshToken: () => localStorage.getItem(loginAPI.refreshTokenStorageKey),

    saveTokenFromResponse: (response) => {
        localStorage.setItem(loginAPI.authTokenStorageKey, response.headers.get(loginAPI.authTokenKey))
        localStorage.setItem(loginAPI.refreshTokenStorageKey, response.headers.get(loginAPI.refreshTokenKey))
    },

    deleteAuthToken: () => localStorage.removeItem(loginAPI.authTokenStorageKey),
    deleteRefreshToken: () => localStorage.removeItem(loginAPI.refreshTokenStorageKey),

    refreshApiPath: (userId) => {
        if (userId !== undefined)
            return `/api/users/${userId}/refreshToken`
        else
            return undefined
    },

    refreshToken: () => {
        const userId = jwtUtils.getUser()?.userId
        const refreshToken = jwtUtils.getRefreshToken()
        if(userId && refreshToken)
            return jwtAPI.refreshToken(userId, refreshToken)
                .then(response => {
                    localStorage.setItem(loginAPI.authTokenStorageKey, response.headers.get(loginAPI.authTokenKey));
                    localStorage.setItem(loginAPI.refreshTokenStorageKey, response.headers.get(loginAPI.refreshTokenKey));
                    return response;
                })
                .catch(() => {
                    localStorage.removeItem(loginAPI.authTokenStorageKey)
                    localStorage.removeItem(loginAPI.refreshTokenStorageKey)
                    Swal.fire({
                        text: "Your session expired. We will take you to our login page!",
                        icon: "warning"
                    })
                    .then(() => {
                        window.history.pushState({urlPath: "/#/login"}, "", "/#/login")
                        window.location.reload()
                    })
                })
    },

    tokenSplitter: (token) => {
        if(typeof token === "string") {
            const parts = token.split('.')
            if(parts.length === 3){
                return parts
            } else return null
        } else {
            return null
        }
    },

    getHeader: (token) =>
        jwtUtils.safeJsonRetrieve(
            jwtUtils.tokenSplitter(token)?.[0]
        ),

    getPayload: (token) =>
        jwtUtils.safeJsonRetrieve(
            jwtUtils.tokenSplitter(token)?.[1]
        ),

    base64UrlToBase64: (base64Url) =>
        base64Url?.replace('-', '+').replace('_', '/'),

    decodeBase64Url: (base64Url) =>
        atob(jwtUtils.base64UrlToBase64(base64Url)),

    safeJsonRetrieve: (base64Url) => {
        if(typeof base64Url === "string"){
            try {
                const decoded = jwtUtils.decodeBase64Url(base64Url)
                return JSON.parse(decoded)
            } catch {
                return null
            }
        } else return null
    },

    payloadToOptUser: (payload) => {
        if(validateSchema(payload, tokenPayloadSchema))
            return {
                userId: Number(payload.iss),
                firstName: payload.firstName,
                lastName: payload.lastName,
                userType: payload.userType,
                mail: payload.mail
            }
        else
            return null
    },

    isTokenActive: (token) => {
        const payload = jwtUtils.getPayload(token)
        const issuedAt = payload?.iat
        const expiresAt = payload?.exp
        if(issuedAt && expiresAt){
            const currentDate = Date.now()
            return issuedAt <= currentDate && currentDate <= expiresAt
        }
        return null
    }
}
