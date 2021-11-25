class HttpError extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
    }
}

const checkResponseStatusOrThrowError = (result, errorMessage) => {
    const {status, data} = result
    console.log(status, data)
    if(status < 200 || status > 299) {
        throw new HttpError(status, data.message || errorMessage || "Something went wrong")
    }
}

export const checkedFetch = (url, data, errorMessage) => {
    return fetch(url, data)
        .then(response => {
            const responsev2 = response.clone()
            return responsev2.json().then(data => ({status: response.status, data: data, response: response}))
        })
        .then(result => {
            checkResponseStatusOrThrowError(result, errorMessage)
            return result.response
        })
}