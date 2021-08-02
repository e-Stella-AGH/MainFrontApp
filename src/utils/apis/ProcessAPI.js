import {recruitmentServiceBasicAPILink} from "./APILinks";
import Swal from "sweetalert2";
import {authFetch} from "../authFetch";

export const processAPI = {

    getProcessById: function (id) {
        return fetch(recruitmentServiceBasicAPILink + `/api/process/${id}`, {
            method: "GET"
        })
            .then(response => response.json())
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "We weren't able to get this process!",
                    icon: "error"
                })
            })
    },

    getAllPossibleStages: function() {
        return fetch(recruitmentServiceBasicAPILink + '/api/process/stages')
            .then(response => response.json())
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "We weren't able to get possible stages!",
                    icon: "error"
                })
            })
    },

    updateProcessStages: function(id, items) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/process/stages/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stages: items
            })
        })
    },

    changeEndDate: function(id, date) {
        const preparedDate = ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth()+1)).slice(-2) + "." + date.getFullYear()
        return authFetch(recruitmentServiceBasicAPILink + `/api/process/${id}/end_date`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: preparedDate
            })
        })
    }

}