import {jwtUtils} from "../../utils/jwt/jwtUtils";
import Paper from "@material-ui/core/Paper";
import React from "react";
import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {userTypes} from "../../utils/Enums";


function info(label, value) {
    return <><Grid item xs={2}>
        <Paper style={{padding: "1em", backgroundColor: "lightgrey"}}><Box display="flex" justifyContent="flex-end">{label}</Box></Paper>
    </Grid>
    <Grid item xs={10}>
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
    }
}

export const ProfilePage = () => {
    const user = jwtUtils.getUser()
    return <Grid container spacing={2}>
        {info("ID:", user.userId)}
        {info("Name:", `${user.firstName} ${user.lastName}`)}
        {info("Mail:", user.mail)}
        {info("Type:", displayType(user.userType))}
    </Grid>
}