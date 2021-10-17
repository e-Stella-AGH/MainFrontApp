import {recruitmentServiceBasicAPILink} from "./APILinks";
import {loginAPI} from "./LoginAPI";
import {jwtUtils} from "../jwt/jwtUtils";
import {checkedFetch} from "../chekedFetch";

export const jwtAPI = {
    refreshToken: (userId, refreshToken) =>
        checkedFetch(
            recruitmentServiceBasicAPILink + jwtUtils.refreshApiPath(userId),
            {
                method: "POST",
                headers: {
                    "x-jwt": refreshToken
                }
            }
        ).then(
            response => {
                localStorage.setItem(loginAPI.authTokenStorageKey, response.headers.get(loginAPI.authTokenKey));
                return response;
            }
        )
}