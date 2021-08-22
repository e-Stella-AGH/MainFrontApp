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

    insertFile: function(filePayload) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/jobseekers/files`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(filePayload)
        })
        .then(response => response.json())
    },

    deleteFile: function(id) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/jobseekers/files/${id}`, {
            method: "DELETE"
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