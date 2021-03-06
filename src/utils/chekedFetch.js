class HttpError extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
    }
}

const checkResponseStatusOrThrowError = (result, errorMessage) => {
    const {status, data} = result
    if(status < 200 || status > 299) {
        throw new HttpError(status, data.message || errorMessage || "Something went wrong")
    }
}

export const checkedFetch = (url, data, errorMessage) => {
    return fetch(url, data)
        .then(response => {
            const clonedResponse = response.clone()
            return clonedResponse.json().then(data => ({status: response.status, data: data, response: response}))
        })
        .then(result => {
            checkResponseStatusOrThrowError(result, errorMessage)
            return result.response
        })
}