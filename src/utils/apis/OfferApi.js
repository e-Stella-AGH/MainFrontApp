import {recruitmentServiceBasicAPILink} from "./APILinks"
import Swal from "sweetalert2";
import { headers } from "./headers";
import {authFetch} from "../authFetch";

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
            .catch(err => {
                Swal.fire({
                    title: "Error",
                    text: "We weren't able to get this offer!",
                    icon: "error"
                })
            })
    },

    getAllOffers: function(){
        return fetch(recruitmentServiceBasicAPILink + "/api/offers")
            .then(response => response.json())
            .catch(err => {
                Swal.fire({
                    title: "Error",
                    text: "We weren't able to get offers!",
                    icon: "error"
                })
            })
    },

    applyWithNoUser: async function (offerId, name, surname, email, files=[]) {
        let convertedFiles = await Promise.all(files.map(async file => {
            return {
                fileName: file.name,
                fileBase64: await convertFileToBase64(file)
            }
        }))
        convertedFiles = convertedFiles.map(file => {
            return {
                ...file,
                fileBase64: convertedFiles[0].fileBase64.substring(
                    convertedFiles[0].fileBase64.indexOf("base64") + 7
                )
            }
        })
        return fetch(recruitmentServiceBasicAPILink + `/api/applications/apply/${offerId}/no-user`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                firstName: name,
                lastName: surname,
                mail: email,
                files: convertedFiles
            })
        })
    },

    create: function (offerData) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/offers`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(offerData)
        })
    },

    update: function (offerData) {
        return fetch(recruitmentServiceBasicAPILink + `/api/offers/${offerData.offerId}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(offerData)
        })
    },

    applyWithUser: function(offerID){

    },
    getOffersFromHr() {
        return this.getAllOffers(); //TODO change after full users functionality implementation
    },

    deleteOffer(id) {
        return fetch(recruitmentServiceBasicAPILink + `/api/offers/${id}`, {
            method: "DELETE",
            headers: headers
        })
    }
}