import {checkedFetch} from "../chekedFetch";
import {recruitmentServiceBasicAPILink} from "./APILinks";

export const applicationsAPI = {
    getApplicationsByOfferId: function(offerId) {
        return checkedFetch(
            recruitmentServiceBasicAPILink + `/api/applications/offer/${offerId}`,
            {method: "GET"}
        ).then(response => response.json())
    }
}