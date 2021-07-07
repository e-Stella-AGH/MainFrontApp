export const jwtUtils = {
    tokenSplitter: (token) => {
        if(typeof token === "string") {
            console.log(token)
            const parts = token.split('.')
            console.log(parts)
            if(parts.length === 3){
                console.log(parts)
                return parts
            } else return null
        } else return null
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
        atob(this.base64UrlToBase64(base64Url)),

    safeJsonRetrieve: (base64Url) => {
        if(base64Url instanceof String){
            try {
                const decoded = this.decodeBase64Url(base64Url)
                return JSON.parse(decoded)
            } catch {
                return null
            }
        } else return null
    }
}
