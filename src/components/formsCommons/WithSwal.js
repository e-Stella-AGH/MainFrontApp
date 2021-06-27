import Swal from "sweetalert2";

export const withSwal = ({
                             loadingTitle,
                             promise,
                             resultWasntOkErrorText,
                             successSwalTitle,
                             successSwalText,
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
        .then(result => {
            if (!result.ok) throw Error(resultWasntOkErrorText)
            swal.close()
            Swal.fire({
                title: successSwalTitle,
                text: successSwalText || "",
                icon: "success"
            })
            successFunction(result)
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