import {authFetch} from "../authFetch";
import {meetingOrganizerLink} from "./APILinks";

export const interviewAPI = {

    getJobSeekerNameByInterviewId : function(interviewId) {
        return new Promise((resolve, reject) => {
            resolve({text: "ok", ok: true, name: 'Waiting for endpoint'})
        })
    },

    getNewestInterview: applicationId => {
        return authFetch(meetingOrganizerLink + `api/interview/newest/${applicationId}`, {}, "Couldn't find interview for this application")
            .then(response => response.json())
    }

}