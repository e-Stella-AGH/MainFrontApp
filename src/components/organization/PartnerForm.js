import {Button, Grid, makeStyles, TextField} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {validateEmail} from "../../utils/functions";
import React, {useState} from "react";
import {withSwal} from "../formsCommons/WithSwal";
import {organizationsAPI} from "../../utils/apis/OrganizationApi";

const useStyles = makeStyles((theme) => ({
    button: {
        height: '97%'
    }
}))

export const PartnerForm = (props) => {

    const classes = useStyles()

    const defaultFormState = {
        firstName: "",
        lastName: "",
        mail: ""
    }

    const [users, setUsers] = useState([props.users])

    const {handleSubmit, control, reset} = useForm({defaultValues:defaultFormState})

    const onUserAdd = (data) => {
        withSwal({
            loadingTitle: "Adding HR user",
            promise: () => organizationsAPI.addHrPartner(data),
            successSwalTitle: "Success",
            successSwalText: "You've successfully added HR user!",
            successFunction: () => {
                setUsers(users.concat(data))
                reset()
                if(props.onSubmit){
                    props.onSubmit(data)
                }
                props.userAdded(data)
            },
            errorSwalTitle: "We couldn't save this user for you"
        })

    }

    return <>
        <form id="user-form" name="user-form" onSubmit={handleSubmit(onUserAdd)}/>
            <Grid item xs={12} sm={3}>
                <Controller
                    control={control}
                    name="firstName"
                    rules={{required: true}}
                    defaultValue={defaultFormState.firstName}
                    render={({field}) =>
                        <TextField
                            {...field}
                            label="First Name"
                            variant="outlined"
                            form="user-form"
                            fullWidth />
                    }
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <Controller
                    control={control}
                    name="lastName"
                    rules={{required: true}}
                    defaultValue={defaultFormState.lastName}
                    render={({field}) =>
                        <TextField
                            {...field}
                            label="Last Name"
                            variant="outlined"
                            form="user-form"
                            fullWidth />
                    }
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <Controller
                    control={control}
                    name="mail"
                    rules={{required: true, validate: (mail) => !users.some(u => u.mail === mail) && validateEmail(mail)}}
                    defaultValue={defaultFormState.lastName}
                    render={({field}) =>
                        <TextField
                            {...field}
                            label="e-mail address"
                            variant="outlined"
                            form="user-form"
                            fullWidth />
                    }
                />
            </Grid>


            <Grid item xs={12} sm={3}>
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    form="user-form"
                    fullWidth>Add HR user</Button>
            </Grid>
    </>
}