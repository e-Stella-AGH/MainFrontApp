import {recruitmentServiceBasicAPILink} from "./APILinks";
import {jwtUtils} from "../jwt/jwtUtils";

export const loginAPI = {
    jwtTokenKey: "x-jwt",
    authTokenKey: "x-auth-token",
    refreshTokenKey: "x-refresh-token",

    authTokenStorageKey: "RS_AUTH_TOKEN",
    refreshTokenStorageKey: "RS_REFRESH_TOKEN",

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
            jwtUtils.saveTokenFromResponse(response)
            return response
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