import {recruitmentServiceBasicAPILink} from "./APILinks"
import {headers} from "./headers";
import {authFetch} from "../authFetch";
import {checkedFetch} from "../chekedFetch";

export const offersAPI = {
    getOfferById: function(offerId){
        return checkedFetch(recruitmentServiceBasicAPILink + `/api/offers/${offerId}`)
            .then(response => response.json())
    },

    getAllOffers: function(forCandidate = false){
        const queryParam = forCandidate ? "?only_started=true" : ""
        return checkedFetch(recruitmentServiceBasicAPILink + "/api/offers" + queryParam)
            .then(response => response.json())
    },

    applyWithNoUser: function (offerId, name, surname, email, files=[]) {
        return fetch(recruitmentServiceBasicAPILink + `/api/applications/apply/${offerId}/no-user`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                firstName: name,
                lastName: surname,
                mail: email,
                files: files
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

    applyWithUser: function(offerID, files) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/applications/apply/${offerID}/user`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                files: files
            })
        })
    },

    getOffersFromHr() {
        return authFetch(recruitmentServiceBasicAPILink + `/api/hrpartners/offers`, {
            method: "GET",
            headers: headers
        }).then(response => response.json())
    },

    getOffersFromOrganization() {
        return authFetch(recruitmentServiceBasicAPILink + `/api/organizations/offers`, {
            method: "GET"
        }).then(response => response.json())
    },

    deleteOffer(id) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/offers/${id}`, {
            method: "DELETE",
            headers: headers
        })
    }
}