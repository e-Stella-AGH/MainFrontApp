import {recruitmentServiceBasicAPILink} from "./APILinks";
import { headers } from "./headers";

export const loginAPI = {

    login: function(login, password) {
        return fetch(recruitmentServiceBasicAPILink + "/api/users/login", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                mail: login,
                password: password
            })
        })
    },

    registerUser: function(login, password, firstName, lastName) {
        return fetch(recruitmentServiceBasicAPILink + "/api/jobseekers", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                mail: login,
                password: password
            })
        })
    },

    registerCompany: function(login, password, name) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({text: "ok", ok: true})
            }, 2000)
        })
    }

}