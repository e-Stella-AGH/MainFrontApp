import {recruitmentServiceBasicAPILink} from "./APILinks";

export const offersAPI = {
    getOfferById: function(offerId){
        return new Promise((resolve, reject) => {
            resolve({
                name: "Offer name",
                company: "Company name",
                description: "Offer Description",
                position: "Offer position",
                minSalary: 2500,
                maxSalary: 2500,
                localization: "Nowhere",
                creatorId: 1,
                skills: [
                    {
                        name: "Skill name",
                        level: "JUNIOR"
                    }
                ]
            })
        })
    },

    applyWithNoUser: function (offerId, name, surname, email, files=[]) {
        return fetch(recruitmentServiceBasicAPILink + `/applications/apply/${offerId}/no-user`, {
            method: "POST",
            body: JSON.stringify({
                firstName: name,
                lastName: surname,
                mail: email,
                files: files
            })
        })
    },

    applyWithUser: function(offerID){

    }
}