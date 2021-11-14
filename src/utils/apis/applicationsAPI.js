import {checkedFetch} from "../chekedFetch";
import {recruitmentServiceBasicAPILink} from "./APILinks";
import {authFetch} from "../authFetch";

export const applicationsAPI = {
    getApplicationsByOfferId: function(offerId) {
        return checkedFetch(
            recruitmentServiceBasicAPILink + `/api/applications/offer/${offerId}`,
            {method: "GET"}
        ).then(response => response.json())
    },

    getApplicationsByJobSeeker: function() {
        return authFetch(
            recruitmentServiceBasicAPILink + '/api/applications/job-seeker',
            {method: "GET"}
        ).then(response => response.json())
    },

    rejectApplication: function(applicationId) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/applications/${applicationId}/reject`, {method: "PUT"})
    },

    nextStage: function(applicationId, devMails) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/applications/${applicationId}/next`, {
            method: "PUT",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({"devs": devMails})
        })
    }
}