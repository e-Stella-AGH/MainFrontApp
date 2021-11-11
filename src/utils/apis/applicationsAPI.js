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
            body: JSON.stringify({"devs": devMails}),
            headers: {
                'content-type': 'application/json'
            }
        })
    },

    getApplicationsForDev: function(organizationId, devMail, devPassword) {
        return checkedFetch(recruitmentServiceBasicAPILink + `/api/applications/forDev/${devMail}`, {
            headers: {
                'content-type': 'application/json',
                'x-dev-password': devPassword
            }}).then(response => response.json())
        }
}