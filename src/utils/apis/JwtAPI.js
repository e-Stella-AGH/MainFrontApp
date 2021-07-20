import {recruitmentServiceBasicAPILink} from "./APILinks";
import {loginAPI} from "./LoginAPI";
import {jwtUtils} from "../jwt/jwtUtils";

export const jwtAPI = {
    refreshToken: (userId, refreshToken) =>
        fetch(
        recruitmentServiceBasicAPILink + jwtUtils.refreshApiPath(userId),
        {
                method: "POST",
                headers: {
                    "x-jwt": refreshToken
                }
            }
        ).then(
            response => localStorage.setItem(loginAPI.authTokenStorageKey, response.headers.get(loginAPI.authTokenKey)
        ))
}