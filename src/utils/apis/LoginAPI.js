import {recruitmentServiceBasicAPILink} from "./APILinks";

export const loginAPI = {

    login: function(login, password) {
        console.log(JSON.stringify({
            mail: login,
            password: password
        }))
        return fetch(recruitmentServiceBasicAPILink + "/api/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: login,
                password: password
            })
        })
            .then(response => response.text())
            .then(text => {
                return {text: text, ok: true}
            })
    },

    registerUser: function(login, password, firstName, lastName) {
        return fetch(recruitmentServiceBasicAPILink + "/api/users/adduser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                mail: login,
                password: password
            })
        })
            .then(response => response.text())
            .then(text => {
                return {text: text, ok: true}
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