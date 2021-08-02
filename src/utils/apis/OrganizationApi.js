import {recruitmentServiceBasicAPILink} from "./APILinks";
import Swal from "sweetalert2";
import {jwtUtils} from "../jwt/jwtUtils";


export const organizationsAPI = {
    getHrPartnersByOrganization: function() {
        return fetch(recruitmentServiceBasicAPILink + `/api/organizations/hrpartners`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "x-jwt": jwtUtils.getAuthToken()
            }
        }).then(response => response.json())
            .catch(err => {
                Swal.fire({
                    title: "Error",
                    test: "We weren't able to get your organizations' HR users",
                    icon: "error"
                })
            })

    },

    addHrPartner(form) {
        return fetch(recruitmentServiceBasicAPILink + `/api/hrpartners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-jwt": jwtUtils.getAuthToken()
            },
            body: JSON.stringify(form)
        })
    },

    deleteHrPartner(form) {
        return fetch(recruitmentServiceBasicAPILink + `/api/hrpartners/mail`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "x-jwt": jwtUtils.getAuthToken(),
            },
            body: JSON.stringify({
                mail: form.mail
            })
        })
    },

}