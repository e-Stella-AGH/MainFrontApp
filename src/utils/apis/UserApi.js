import {recruitmentServiceBasicAPILink} from "./APILinks";
import Swal from "sweetalert2";


export const usersAPI = {
    getHrPartnersByOrganization: function(organizationId) {
        return fetch(recruitmentServiceBasicAPILink + `/api/organizations/hrpartners`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json' //TODO add jwt props
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
                'Content-Type': 'application/json' //TODO add jwt props
            },
            body: JSON.stringify(form)
        })
    },

    deleteHrPartner(form) {
        return fetch(recruitmentServiceBasicAPILink + `/api/hrpartners`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json' //TODO add jwt props
            }
        })
    }
}