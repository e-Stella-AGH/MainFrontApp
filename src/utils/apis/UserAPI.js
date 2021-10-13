import {recruitmentServiceBasicAPILink} from "./APILinks";
import {authFetch} from "../authFetch";

export const userAPI = {

    updateUser: function (userRequest) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/users`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userRequest)
        })
    },

    updatePersonalData: function (personalData) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/users/personalData`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(personalData)
        })
    },

    updatePassword: function (passwordRequest) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/users/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(passwordRequest)
        })
    }
}