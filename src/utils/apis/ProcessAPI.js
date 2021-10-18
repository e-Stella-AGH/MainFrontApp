import {recruitmentServiceBasicAPILink} from "./APILinks";
import {authFetch} from "../authFetch";
import {checkedFetch} from "../chekedFetch";

export const processAPI = {

    getProcessById: function (id) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/process/${id}`, {
            method: "GET"
        })
            .then(response => response.json())
    },

    getAllPossibleStages: function() {
        return checkedFetch(recruitmentServiceBasicAPILink + '/api/process/stages')
            .then(response => response.json())
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
        const preparedDate = this._prepareDate(date)
        return authFetch(recruitmentServiceBasicAPILink + `/api/process/${id}/end_date`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: preparedDate
            })
        })
    },

    _prepareDate: function(date) {
        return ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth()+1)).slice(-2) + "." + date.getFullYear()
    }

}