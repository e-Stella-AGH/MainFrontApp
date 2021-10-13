import {Grid} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {organizationsAPI} from "../../utils/apis/OrganizationApi";
import {PartnerForm} from "./PartnerForm";
import {withSwal} from "../commons/formsCommons/WithSwal";
import {OrganizationPartnerList} from "./OrganizationPartnerList";

export const OrganizationPartnersManagement = (props) => {

    const [users, setUsers] = useState([])

    function updateUsers(data) {
        setUsers(data.map(el => el.user))
    }

    useEffect(() => {
        organizationsAPI.getHrPartnersByOrganization()
            .then(data => {
                updateUsers(data)
            })
    }, [])


    const onUserDelete = (idx, data) => {
        withSwal({
            loadingTitle: "Deleting HR user",
            promise: () => organizationsAPI.deleteHrPartner(data),
            successSwalTitle: "Success",
            successSwalText: "You've successfully deleted HR user!",
            successFunction: () => setUsers(users.slice(0, idx).concat(users.slice(idx+1, undefined))),
            errorSwalTitle: "We couldn't delete this user for you"
        })
        if (props.onDelete) {
            props.onDelete(data)
        }
    }

    return <div style={{width: "95%", marginRight: "auto", marginLeft: "auto", paddingBottom: "30px"}}>
        <Grid container spacing={2}>
            <PartnerForm users={users} userAdded={(user) => setUsers(users.concat(user))}/>
        </Grid>
        <Grid item xs={12}>
            <OrganizationPartnerList users={users} onUserDelete={onUserDelete} />
        </Grid>
    </div>
}