import {useForm} from "react-hook-form";
import {withSwal} from "../../formsCommons/WithSwal";
import {loginAPI} from "../../../utils/apis/LoginAPI";
import {useHistory} from "react-router-dom";
import {Button, Card, Grid, Typography} from "@material-ui/core";
import {FormField} from "../../formsCommons/FormField";

export const UserRegistration = (props) => {
    const defaultFormState = {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    }

    const history = useHistory()

    const { handleSubmit, control, reset } = useForm({mode: "onChange", defaultValues: defaultFormState})

    const onSubmit = (data) => {
        withSwal({
            loadingTitle: "Registering...",
            promise: () => loginAPI.registerUser(data.login, data.password, data.firstName, data.lastName),
            successSwalTitle: "Successfully registered!",
            successSwalText: "You can log in now!",
            confirmButtonText: "Go to login page",
            successFunction: () => {
                reset()
                history.push('/login')
            },
            errorSwalTitle: "We couldn't register you!"
        })
    }

    return (
        <Card variant="outlined" style={{width: "60%", marginLeft: "auto", marginRight: "auto", padding: "30px 10px"}}>
            <Typography variant="h5" style={{marginBottom: "20px", marginLeft: "auto", marginRight: "auto", width: "80%"}}>Register!</Typography>
            <div style={{width: "80%", marginRight: "auto", marginLeft: "auto", padding: "10px", paddingBottom: "30px"}}>
                <form id="user-register-form" name="user-register-form" onSubmit={handleSubmit(onSubmit)} />

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
                            label: "Email",
                            form: "user-register-form"
                        }}
                    />
                    <FormField
                        control={control}
                        name="password"
                        rules={{
                            required: {value: true, message: "Required field"},
                        }}
                        defaultValue=""
                        additionalTextFieldProps={{
                            label: "Password",
                            form: "user-register-form",
                            type: "password"
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
                            form: "user-register-form"
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
                            form: "user-register-form"
                        }}
                    />
                    <Grid item xs={false} sm={8} />
                    <Grid item xs={12} sm={4}>
                        <Button type="submit" variant="contained" size="large" form="user-register-form" fullWidth>Register</Button>
                    </Grid>
                </Grid>

            </div>
        </Card>
    )
}