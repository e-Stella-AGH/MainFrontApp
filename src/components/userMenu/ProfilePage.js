import {jwtUtils} from "../../utils/jwt/jwtUtils";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {userTypes} from "../../utils/Enums";


function UserInfo({label, value}) {
    return <><Grid item xs={12} sm={3}>
        <Paper style={{padding: "1em", backgroundColor: "lightgrey"}}><Box display="flex" justifyContent="flex-end">{label}</Box></Paper>
    </Grid>
    <Grid item xs={12} sm={9}>
        <Paper style={{padding: "1em", backgroundColor: "primary"}}>{value}</Paper>
    </Grid></>
}

function displayType(userType) {
    switch (userType) {
        case userTypes.JOB_SEEKER:
            return "Job Seeker"

        case userTypes.HR:
            return "Human Resources Specialist"

        case userTypes.ORGANIZATION:
            return "Organization"

        default:
            return undefined
    }
}

export const ProfilePage = () => {
    const user = jwtUtils.getUser()
    return <Grid container>
        <Grid item lg={2} md={1} sm={false}/>
        <Grid container spacing={2} item lg={8} md={10} sm={12}>
            <UserInfo label="ID:" value={user.userId} />
            <UserInfo label="Name:" value={`${user.firstName} ${user.lastName}`} />
            <UserInfo label="Mail:" value={user.mail} />
            <UserInfo label="Type:" value={displayType(user.userType)} />
        </Grid>
        <Grid item lg={2} md={1} sm={false}/>
    </Grid>
}