import {Button, Card, Grid, Typography} from "@material-ui/core";
import {FormField} from "../commons/formsCommons/FormField";
import {useForm} from "react-hook-form";
import React, {useEffect} from "react";
import {jwtUtils} from "../../utils/jwt/jwtUtils";
import {userAPI} from "../../utils/apis/UserAPI";
import {withSwal} from "../commons/formsCommons/WithSwal";

const EditPersonalInfoForm = () => {
    const user = jwtUtils.getUser()
    const defaultFormState = {
        mail: user.mail,
        firstName: user.firstName,
        lastName: user.lastName
    }

    const { handleSubmit, control } = useForm({mode: "onChange", defaultValues: defaultFormState})

    const onSubmit = ({firstName, lastName}) =>
        withSwal({
            loadingTitle: "Waiting for server response...",
            promise: () => userAPI.updatePersonalData({firstName, lastName}),
            successSwalTitle: "Successful change!",
            errorSwalTitle: "We couldn't change your personal data!"
        })

    return <Card variant="outlined" style={{paddingBottom: "30px", paddingTop: "30px"}}>
        <div style={{width: "80%", margin: "auto"}}>
            <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "85%"}}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h5" style={{marginBottom: "20px"}}>Edit your personal data</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormField
                            control={control}
                            name="mail"
                            defaultValue=""
                            additionalTextFieldProps={{
                                label: "Email",
                                disabled: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormField
                            control={control}
                            name="firstName"
                            rules={{
                                required: {value: true, message: "Required field"},
                            }}
                            defaultValue=""
                            additionalTextFieldProps={{
                                label: "First Name",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormField
                            control={control}
                            name="lastName"
                            rules={{
                                required: {value: true, message: "Required field"},
                            }}
                            defaultValue=""
                            additionalTextFieldProps={{
                                label: "Last Name",
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={false} sm={8} />
                    <Grid item xs={12} sm={4}>
                        <Button type="submit" variant="contained" size="large" color="primary" fullWidth>Save</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Card>
}

const EditPasswordForm = () => {
    const defaultFormState = {
        oldPassword: "",
        newPassword: "",
        repeatedPassword: ""
    }

    const { handleSubmit, control, watch, trigger } = useForm({mode: "onChange", defaultValues: defaultFormState})

    const newPasswordInput = watch("newPassword")

    useEffect(
        () => {
            if(newPasswordInput)
                trigger("repeatedPassword")
        },
        [newPasswordInput, trigger]
    )

    const onSubmit = ({oldPassword, newPassword}) =>
        withSwal({
            loadingTitle: "Waiting for server response...",
            promise: () => userAPI.updatePassword({oldPassword: oldPassword, newPassword: newPassword}),
            successSwalTitle: "Successfully changed password!",
            errorSwalTitle: "We couldn't change your password!"
        })

    return <Card variant="outlined" style={{paddingBottom: "30px", paddingTop: "30px"}}>
        <div style={{width: "80%", margin: "auto"}}>
            <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "85%"}}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h5" style={{marginBottom: "20px"}}>Edit password</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormField
                            control={control}
                            name="oldPassword"
                            rules={{
                                required: {value: true, message: "Required field"}
                            }}
                            defaultValue=""
                            additionalTextFieldProps={{
                                label: "Current password",
                                type: "password"
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormField
                            control={control}
                            name="newPassword"
                            rules={{
                                required: {value: true, message: "Required field"}
                            }}
                            defaultValue=""
                            additionalTextFieldProps={{
                                label: "New password",
                                type: "password"
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormField
                            control={control}
                            name="repeatedPassword"
                            rules={{
                                required: {value: true, message: "Required field"},
                                pattern: {value: new RegExp(`^${newPasswordInput}$`), message: "Passwords have to match"},
                            }}
                            defaultValue=""
                            additionalTextFieldProps={{
                                label: "Repeat password",
                                type: "password"
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={false} sm={8} />
                    <Grid item xs={12} sm={4}>
                        <Button type="submit" variant="contained" size="large" color="primary" fullWidth>Save</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Card>
}

export const SettingsPage = () => {
    return <>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <EditPersonalInfoForm />
            </Grid>
            <Grid item xs={12} md={6}>
                <EditPasswordForm />
            </Grid>
        </Grid>
    </>
}