import {recruitmentServiceBasicAPILink} from "./APILinks";
import {jwtUtils} from "../jwt/jwtUtils";
import {headers} from "./headers";

export const loginAPI = {
    jwtTokenKey: "x-jwt",
    authTokenKey: "x-auth-token",
    refreshTokenKey: "x-refresh-token",

    authTokenStorageKey: "RS_AUTH_TOKEN",
    refreshTokenStorageKey: "RS_REFRESH_TOKEN",

    login: function(login, password) {
        return fetch(recruitmentServiceBasicAPILink + "/api/users/login", {
            method: "POST",
            headers: headers,
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
        return fetch(recruitmentServiceBasicAPILink + "/api/organizations", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                name: name,
                mail: login,
                password: password
            })
        })
    }
}