import Swal from "sweetalert2";

const checkResponseStatusOrThrowError = (response, error) => {
    if(response.statusCode < 200 || response.statusCode > 299)
        throw error || Error("Something went wrong")
}

export const checkedFetch = (url, data, error) => {
    return fetch(url, data)
        .then(response => {
            checkResponseStatusOrThrowError(response, error)
            return response
        }).catch(err => Swal.fire({
            title: "Error",
            text: err.message,
            icon: "error"
        }))
}