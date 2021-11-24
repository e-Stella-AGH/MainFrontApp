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
        const fetchToUse = password ? checkedFetch : authFetch
        const headers = password ? {
            'x-dev-password': password
        } : {}
        return fetchToUse(`${recruitmentServiceBasicAPILink}/api/applications/get_notes?interview_note=${interviewId}`, {
            method: 'GET',
            headers
        }).then(response => response.json())
    },

    getInterviewObjectById: interviewId => checkedFetch(`${recruitmentServiceBasicAPILink}/api/interview/${interviewId}`)
        .then(response => response.json()),

    getTaskStageUUIDByInterviewId: interviewId => checkedFetch(`${recruitmentServiceBasicAPILink}/api/taskStages/byInterview/${interviewId}`)
        .then(response => response.json())
}