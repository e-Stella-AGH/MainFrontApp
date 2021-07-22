import {Controller, useForm} from "react-hook-form";
import {Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {withSwal} from "../formsCommons/WithSwal";
import React, {useEffect, useState} from "react";
import ClearIcon from "@material-ui/icons/Clear";
import {OrganizationPartner} from "./OrganizationPartner";
import {usersAPI} from "../../utils/apis/UserApi";
import {validateEmail} from "../../utils/functions";
import {PartnerForm} from "./PartnerForm";

export const OrganizationsPartnerList = (props) => {

    const id = 1 //TODO change after jwt

    const [users, setUsers] = useState([props.users])
    const partnerForm = PartnerForm({
        users: users,
        userAdded: (user) => setUsers(user)
    })

    function updateUsers(data) {
        setUsers(data.map(el => el.user))
        partnerForm.setUsers(users)
    }

    useEffect(() => {

        if(id !== undefined){
            usersAPI.getHrPartnersByOrganization(id)
                .then(data => updateUsers(data))
        }
    }, [id])


    const onUserDelete = (idx, data) => {
        withSwal({
            loadingTitle: "Deleting HR user",
            promise: () => usersAPI.deleteHrPartner(data),
            successSwalTitle: "Success",
            successSwalText: "You've successfully deleted HR user!",
            successFunction: () => {
                setUsers(users.slice(0, idx).concat(users.slice(idx+1, undefined)))
            },
            errorSwalTitle: "We couldn't delete this user for you"
        })
        if (props.onDelete) {
            props.onDelete(data)
        }
    }

    return <>
        <PartnerForm users={users} userAdded={(user) => setUsers(users.concat(user))}></PartnerForm>
        <Grid item xs={12}>
            <Box mt={0} mb={0}>
                <Grid container>
                    {users.map((user, idx) =>
                        <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                            <Grid container>
                                <Grid item xs={11}>
                                    <OrganizationPartner key={idx} firstName={user.firstName} lastName={user.lastName} mail={user.mail}/>
                                </Grid>
                                <Grid item xs={1}>
                                    <Box mt={3}>
                                        <IconButton aria-label="delete" style={{padding:"0px"}} onClick={() => onUserDelete(idx, user)}>
                                            <ClearIcon fontSize="medium" />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>)}
                </Grid>
            </Box>
        </Grid>
    </>
}