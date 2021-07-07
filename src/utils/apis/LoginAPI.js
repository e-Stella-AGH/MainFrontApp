import {recruitmentServiceBasicAPILink} from "./APILinks";

export const loginAPI = {

    authTokenKey: "x-auth-token",
    refreshTokenKey: "x-refresh-token",

    login: function(login, password) {
        return fetch(recruitmentServiceBasicAPILink + "/api/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: login,
                password: password
            })
        }).then(response => {
            localStorage.setItem("RS_AUTH_TOKEN", response.headers.get(this.authTokenKey))
            localStorage.setItem("RS_REFRESH_TOKEN", response.headers.get(this.refreshTokenKey))
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
    },

    registerCompany: function(login, password, name) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({text: "ok", ok: true})
            }, 2000)
        })
    }

}