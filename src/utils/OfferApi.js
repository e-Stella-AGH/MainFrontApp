import {recruitmentServiceBasicAPILink} from "./APILinks";

const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = err => reject(err)
    })
}

export const offersAPI = {
    getOfferById: function(offerId){
        return fetch(recruitmentServiceBasicAPILink + `/api/offers/${offerId}`)
            .then(response => response.json())
    },

    applyWithNoUser: async function (offerId, name, surname, email, files=[]) {
        let convertedFiles = await Promise.all(files.map(async file => {
            return {
                fileName: file.name,
                file_base64: await convertFileToBase64(file)
            }
        }))
        return fetch(recruitmentServiceBasicAPILink + `/applications/apply/${offerId}/no-user`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: name,
                lastName: surname,
                mail: email,
                files: convertedFiles
            })
        })
    },

    applyWithUser: function(offerID){

    }
}