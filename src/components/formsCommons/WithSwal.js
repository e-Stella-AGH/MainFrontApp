import Swal from "sweetalert2";

export const withSwal = ({
                             loadingTitle,
                             promise,
                             successSwalTitle,
                             successSwalText,
                             confirmButtonText,
                             successFunction,
                             errorSwalTitle,
                             errorSwalText,
                             errorConfirmButtonText
                         }) => {
    let swal = new Swal({
        title: loadingTitle
    })
    Swal.showLoading()
    promise()
        .then(response => response.json().then(data => ({status: response.status, result: data})))
        .then(({status, result}) => {
            if (!(Math.floor(status / 100) === 2)) {
                throw Error(result.errorMessage || "Something went wrong!")
            }
            swal.close()
            Swal.fire({
                title: successSwalTitle,
                text: successSwalText || "",
                icon: "success",
                confirmButtonText: confirmButtonText || "OK"
            }).then(swalResult => {
                if (swalResult.isConfirmed) {
                    successFunction(result)
                }
            })
        })
        .catch(err => {
            swal.close()
            Swal.fire({
                title: errorSwalTitle,
                text: errorSwalText || err,
                icon: "error",
                confirmButtonText: errorConfirmButtonText || "OK"
            })
        })
}