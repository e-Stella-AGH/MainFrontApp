import {recruitmentServiceBasicAPILink} from "./APILinks";
import Swal from "sweetalert2";

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
    }

}