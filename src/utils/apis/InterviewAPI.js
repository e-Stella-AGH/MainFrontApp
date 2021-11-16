import {authFetch} from "../authFetch";
import {checkedFetch} from "../chekedFetch"
import {recruitmentServiceBasicAPILink} from "./APILinks";

export const interviewAPI = {

    getJobSeekerNameByInterviewId : (interviewId) => checkedFetch(`${recruitmentServiceBasicAPILink}/api/interview/jobseeker/${interviewId}`).then(response => response.json()),

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