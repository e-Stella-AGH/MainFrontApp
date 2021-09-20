import {recruitmentServiceBasicAPILink} from "./APILinks"
import Swal from "sweetalert2";
import {headers} from "./headers";
import {authFetch} from "../authFetch";
import {convertFileToBase64} from "./files";

export const offersAPI = {
    getOfferById: function(offerId){
        return fetch(recruitmentServiceBasicAPILink + `/api/offers/${offerId}`)
            .then(response => response.json())
            .catch(() => {
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
            .catch(() => {
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
        return authFetch(recruitmentServiceBasicAPILink + `/api/offers/${offerData.offerId}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(offerData)
        })
    },

    applyWithUser: function(offerID) {
        return new Promise((resolve) => {
            resolve({})
        })
        // return authFetch(recruitmentServiceBasicAPILink + `/api/applications/apply/${offerID}`, {
        //     method: "POST"
        // })
    },

    getOffersFromHr() {
        return authFetch(recruitmentServiceBasicAPILink + `/api/hrpartners/offers`, {
            method: "GET",
            headers: headers
        }).then(response => response.json())
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "We weren't able to get offers!",
                    icon: "error"
                })
            })
    },

    getOffersFromOrganization() {
        return authFetch(recruitmentServiceBasicAPILink + `/api/organizations/offers`, {
            method: "GET"
        }).then(response => response.json())
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "We weren't able to get offers!",
                    icon: "error"
                })
            })
    },

    deleteOffer(id) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/offers/${id}`, {
            method: "DELETE",
            headers: headers
        })
    }
}