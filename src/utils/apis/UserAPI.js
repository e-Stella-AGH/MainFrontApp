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
    }
}