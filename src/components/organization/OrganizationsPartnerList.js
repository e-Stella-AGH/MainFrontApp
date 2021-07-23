import {Controller, useForm} from "react-hook-form";
import {Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {withSwal} from "../formsCommons/WithSwal";
import React, {useEffect, useState} from "react";
import ClearIcon from "@material-ui/icons/Clear";
import {OrganizationPartner} from "./OrganizationPartner";
import {organizationsAPI} from "../../utils/apis/OrganizationApi";
import {validateEmail} from "../../utils/functions";
import {PartnerForm} from "./PartnerForm";
import {jwtUtils} from "../../utils/jwt/jwtUtils";

export const OrganizationsPartnerList = (props) => {

    const [users, setUsers] = useState([props.users])
    // const partnerForm = PartnerForm({
    //     users: users,
    //     userAdded: (user) => setUsers(user)
    // })

    function updateUsers(data) {
        setUsers(data.map(el => el.user))
        console.log(jwtUtils.getAuthToken())
        // partnerForm.setUsers(users)
    }

    useEffect(() => {
            organizationsAPI.getHrPartnersByOrganization()
                .then(data => {
                    console.log(data)
                    updateUsers(data)
                })

    }, [])


    const onUserDelete = (idx, data) => {
        withSwal({
            loadingTitle: "Deleting HR user",
            promise: () => organizationsAPI.deleteHrPartner(data),
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

    return <div style={{width: "60%", marginRight: "auto", marginLeft: "auto", padding: "10px", paddingBottom: "30px"}}>
        <Grid container spacing={2}>
        <PartnerForm users={users} userAdded={(user) => setUsers(users.concat(user))}/>
        </Grid>
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
    </div>
}