class HttpError extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
    }
}

const checkResponseStatusOrThrowError = (response, errorMessage) => {
    const code = response.status
    if(code < 200 || code > 299) {
        throw new HttpError(code, errorMessage || "Something went wrong")
    }
}

export const checkedFetch = (url, data, errorMessage) => {
    return fetch(url, data)
        .then(response => {
            checkResponseStatusOrThrowError(response, errorMessage)
            return response
        })
}