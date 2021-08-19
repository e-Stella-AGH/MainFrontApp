import {recruitmentServiceBasicAPILink} from "./APILinks";
import Swal from "sweetalert2";
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
    }

}