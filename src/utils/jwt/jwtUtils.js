import {validateSchema} from "../schemas/validateSchema";
import {tokenPayloadSchema} from "../schemas/tokenPayloadSchema";

export const jwtUtils = {
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
            if(issuedAt <= currentDate && currentDate <= expiresAt)
                return true
            else
                return false
        }
        return null
    }
}
