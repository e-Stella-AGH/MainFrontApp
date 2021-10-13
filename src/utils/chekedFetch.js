import Swal from "sweetalert2";

const checkResponseStatusOrThrowError = (response, error) => {
    if(response.status < 200 || response.status > 299)
        throw error || Error("Something went wrong")
}

export const checkedFetch = (url, data, error, withSwal) => {
    return fetch(url, data)
        .then(response => {
            checkResponseStatusOrThrowError(response, error)
            return response
        }).catch(err => {throw new Error()})
}