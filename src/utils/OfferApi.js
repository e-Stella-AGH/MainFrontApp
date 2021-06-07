import {recruitmentServiceBasicAPILink} from "./APILinks"

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

    apply: function (offerId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Success")
            }, 1000)
        })
    },

    create: function (offerData) {
        return fetch(recruitmentServiceBasicAPILink + `/api/offers/addoffer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offerData)
        })
    }
}