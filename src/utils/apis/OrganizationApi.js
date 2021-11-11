import {recruitmentServiceBasicAPILink} from "./APILinks";
import Swal from "sweetalert2";
import {authFetch} from "../authFetch";


export const organizationsAPI = {
    getHrPartnersByOrganization: function() {
        return authFetch(recruitmentServiceBasicAPILink + `/api/organizations/hrpartners`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response => response.json())
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    test: "We weren't able to get your organizations' HR users",
                    icon: "error"
                })
            })

    },

    addHrPartner(form) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/hrpartners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
    },

    deleteHrPartner(form) {
        return authFetch(recruitmentServiceBasicAPILink + `/api/hrpartners/mail`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: form.mail
            })
        })
    },

}