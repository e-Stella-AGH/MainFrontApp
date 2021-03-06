import {useForm} from "react-hook-form";
import {loginAPI} from "../../../utils/apis/LoginAPI";
import {FormField} from "../../commons/formsCommons/FormField";
import {Button, Card, Grid, Typography} from "@material-ui/core";
import {withSwal} from "../../commons/formsCommons/WithSwal";
import React from "react";
import {useLoggedIn} from "../../../utils/hooks/useLoggedIn";
import {Redirect} from "react-router-dom";

export const LoginForm = ({reload, onSubmit, shouldRedirectIfLoggedIn = true}) => {

    const {loggedIn, login} = useLoggedIn()

    const defaultFormState = {
        login: "",
        password: ""
    }

    const {handleSubmit, control, reset} = useForm({mode: 'onChange', defaultValues: defaultFormState})

    const doOnSubmit = (data) => {
        withSwal({
            loadingTitle: "Logging in...",
            promise: () => loginAPI.login(data.login, data.password),
            successSwalTitle: "Successfully logged in!",
            successFunction: (token) => {
                reset()
                login()
                reload.setReload(!reload.reload)
            },
            errorSwalTitle: "We couldn't log you in!"
        })
        if(onSubmit) {
            onSubmit(data)
        }
    }

    return loggedIn && shouldRedirectIfLoggedIn ? <Redirect to="/" /> : <Card variant="outlined" style={{width: "60%", marginLeft: "auto", marginRight: "auto", padding: "30px 10px"}}>
            <Typography variant="h5" style={{marginBottom: "20px", marginLeft: "auto", marginRight: "auto", width: "80%"}}>Login!</Typography>
            <div style={{width: "80%", marginRight: "auto", marginLeft: "auto", padding: "10px", paddingBottom: "30px"}}>
                <form id="login-form" name="login-form" onSubmit={handleSubmit(doOnSubmit)}>
                    <Grid container spacing={2}>
                        <FormField
                            control={control}
                            name="login"
                            rules={{
                                required: {value: true, message: "Required field"},
                                pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Login is your email, so it must be a valid email"}
                            }}
                            defaultValue=""
                            additionalTextFieldProps={{
                                label: "Login"
                            }}
                        />
                        <FormField
                            control={control}
                            name="password"
                            rules={{
                                required: {value: true, message: "Required field"}
                            }}
                            defaultValue=""
                            additionalTextFieldProps={{
                                label: "Password",
                                autoComplete: "off",
                                type: "password"
                            }}
                        />
                        <Grid item xs={false} sm={8} />
                        <Grid item xs={12} sm={4}>
                            <Button type="submit" variant="contained" size="large" fullWidth color="primary">Login</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Card>
}