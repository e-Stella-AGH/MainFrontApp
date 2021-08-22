import {Button, Card, Grid, Typography} from "@material-ui/core";
import {FormField} from "../commons/formsCommons/FormField";
import {useForm} from "react-hook-form";
import React from "react";
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

    const onSubmit = (formState) =>
        withSwal({
            loadingTitle: "Waiting for server response...",
            promise: () => userAPI.updateUser(formState),
            successSwalTitle: "Successful change!",
            errorSwalTitle: "We couldn't change your personal data!"
        })

    return (
        <Card variant="outlined" style={{width: "90%", marginLeft: "auto", marginRight: "auto", padding: "30px 10px"}}>
            <div style={{width: "90%", marginRight: "auto", marginLeft: "auto", padding: "10px", paddingBottom: "30px"}}>
                <Typography variant="h5" style={{marginBottom: "20px"}}>Edit your personal data</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <FormField
                            control={control}
                            name="mail"
                            defaultValue=""
                            additionalTextFieldProps={{
                                label: "Email",
                                disabled: true
                            }}
                        />
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
                        <Grid item xs={false} sm={8} />
                        <Grid item xs={12} sm={4}>
                            <Button type="submit" variant="contained" size="large" fullWidth>Save</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Card>
    )
}

const EditPasswordForm = () => {
    const defaultFormState = {
        password: "",
        repeatedPassword: ""
    }

    const { handleSubmit, control, getValues } = useForm({mode: "onChange", defaultValues: defaultFormState})

    const onSubmit = ({password}) =>
        withSwal({
            loadingTitle: "Waiting for server response...",
            promise: () => userAPI.updateUser({password}),
            successSwalTitle: "Successfully changed password!",
            errorSwalTitle: "We couldn't change your password!"
        })

    return (
        <Card variant="outlined" style={{width: "90%", marginLeft: "auto", marginRight: "auto", padding: "30px 10px"}}>
            <div style={{width: "90%", marginRight: "auto", marginLeft: "auto", padding: "10px", paddingBottom: "30px"}}>
                <Typography variant="h5" style={{marginBottom: "20px"}}>Edit password</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <FormField
                            control={control}
                            name="password"
                            rules={{
                                required: {value: true, message: "Required field"}
                            }}
                            defaultValue=""
                            additionalTextFieldProps={{
                                label: "New password",
                                type: "password"
                            }}
                        />
                        <FormField
                            control={control}
                            name="repeatedPassword"
                            rules={{
                                required: {value: true, message: "Required field"},
                                pattern: {value: getValues("password"), message: "Passwords has to match"},
                            }}
                            defaultValue=""
                            additionalTextFieldProps={{
                                label: "Repeat password",
                                type: "password"
                            }}
                        />
                        <Grid item xs={false} sm={8} />
                        <Grid item xs={12} sm={4}>
                            <Button type="submit" variant="contained" size="large" fullWidth>Save</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Card>
    )
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