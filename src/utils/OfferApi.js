export const offersAPI = {
    getOfferById: function(offerId){
        return new Promise((resolve, reject) => {
            resolve({
                name: "Offer name",
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
    }
}