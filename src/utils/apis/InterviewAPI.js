import {authFetch} from "../authFetch";
import {meetingOrganizerLink, recruitmentServiceBasicAPILink} from "./APILinks";

export const interviewAPI = {

    getJobSeekerNameByInterviewId : function(interviewId) {
        return new Promise((resolve, reject) => {
            resolve({text: "ok", ok: true, name: 'Waiting for endpoint'})
        })
    },

    getNewestInterviewId: applicationId => {
        return authFetch(recruitmentServiceBasicAPILink + `/api/interview/newest/${applicationId}`, {}, "Couldn't find interview for this application")
            .then(response => response.json())
    },

    getNewestInterview: applicationId => {
        return authFetch(recruitmentServiceBasicAPILink + `/api/interview/newest/${applicationId}/interview`, {}, "Couldn't find interview for this application")
            .then(response => response.json())
    }

}