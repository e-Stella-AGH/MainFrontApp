import Swal from "sweetalert2";

const isStatus2xx = (status) => (Math.floor(status / 100) === 2)

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
            if (!isStatus2xx(status)) {
                throw Error(result.message)
            }
            swal.close()
            Swal.fire({
                title: successSwalTitle,
                text: successSwalText || "",
                icon: "success",
                confirmButtonText: confirmButtonText || "OK"
            }).then(swalResult => {
                if (swalResult.isConfirmed && successFunction) {
                    successFunction(result)
                }
            })
        })
        .catch(err => {
            swal.close()
            Swal.fire({
                title: errorSwalTitle || "Something went wrong!",
                text: err || errorSwalText,
                icon: "error",
                confirmButtonText: errorConfirmButtonText || "OK"
            })
        })
}