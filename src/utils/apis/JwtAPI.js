import {recruitmentServiceBasicAPILink} from "./APILinks";
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
        )
}