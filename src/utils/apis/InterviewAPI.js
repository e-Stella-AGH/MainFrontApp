import {authFetch} from "../authFetch";
import {meetingOrganizerLink} from "./APILinks";

export const interviewAPI = {

    getJobSeekerNameByInterviewId : function(interviewId) {
        return new Promise((resolve, reject) => {
            resolve({text: "ok", ok: true, name: 'Waiting for endpoint'})
        })
    },

    getNewestInterview: applicationId => {
        return authFetch(meetingOrganizerLink + `api/interview/newest/${applicationId}`, {})
            .then(response => response.json())
    }

}