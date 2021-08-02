const checkResponseOrError = (response) => {
    if (response.statusCode < 200 || response.statusCode > 299) throw Error("Response code ")
}


export const checkStatusFetch = (url, data) => {
    return fetch(url, data)
        .then(response => {
            checkResponseOrError(response)
            return response
        })
}