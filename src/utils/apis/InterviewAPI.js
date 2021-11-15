import {authFetch} from "../authFetch";
import {checkedFetch} from "../chekedFetch"
import {recruitmentServiceBasicAPILink} from "./APILinks";

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
    },

    getNotesByInterviewId: (interviewId, password) => {
        return checkedFetch(`${recruitmentServiceBasicAPILink}/api/applications/get_notes?interview_note=${interviewId}`, {
            method: 'GET',
            headers: {
                'x-dev-password': password
            }
        }).then(response => response.json())
    },

    getInterviewObjectById: interviewId => checkedFetch(`${recruitmentServiceBasicAPILink}/api/interview/${interviewId}`)
        .then(response => response.json())

}