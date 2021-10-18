import {recruitmentServiceBasicAPILink} from "./APILinks";
import {authFetch} from "../authFetch";

export const jobSeekerAPI = {

    getJobSeeker: function (id) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/jobseekers/${id}`, {
            method: "GET"
        })
        .then(response => response.json())
    },

    getFiles: function() {
        return authFetch(recruitmentServiceBasicAPILink + `/api/jobseekers/files`, {
            method: "GET"
        })
        .then(response => response.json())
    },

    insertFiles: function(files) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/jobseekers/files`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({files: files})
        })
    }
}