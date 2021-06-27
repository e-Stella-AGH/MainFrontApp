import {useForm} from "react-hook-form";
import {loginAPI} from "../../../utils/apis/LoginAPI";
import {FormField} from "../../formsCommons/FormField";
import {Button, Card, Grid, Typography} from "@material-ui/core";
import {withSwal} from "../../formsCommons/WithSwal";

export const LoginForm = (props) => {
    const defaultFormState = {
        login: "",
        password: ""
    }

    const {handleSubmit, control, reset} = useForm({mode: 'onChange', defaultValues: defaultFormState})

    const onSubmit = (data) => {
        withSwal({
            loadingTitle: "Loging in...",
            promise: () => loginAPI.login(data.login, data.password),
            successSwalTitle: "Successfully logged in!",
            successFunction: (token) => {
                reset()
                alert(token)
            },
            errorSwalTitle: "We couldn't log you in!"
        })
        if(props.onSubmit) {
            props.onSubmit(data)
        }
    }

    return (
        <Card variant="outlined" style={{width: "60%", marginLeft: "auto", marginRight: "auto", padding: "30px 10px"}}>
            <Typography variant="h5" style={{marginBottom: "20px", marginLeft: "auto", marginRight: "auto", width: "80%"}}>Login!</Typography>
            <div style={{width: "80%", marginRight: "auto", marginLeft: "auto", padding: "10px", paddingBottom: "30px"}}>
                <form id="login-form" name="login-form" onSubmit={handleSubmit(onSubmit)} />
                <Grid container spacing={2}>
                    <FormField
                        control={control}
                        name="login"
                        rules={{
                            required: {value: true, message: "Required field"}
                        }}
                        defaultValue=""
                        additionalTextFieldProps={{
                            label: "Login",
                            autoComplete: "off",
                            form: "login-form"
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
                            form: "login-form",
                            type: "password"
                        }}
                    />
                    <Grid item xs={false} sm={8} />
                    <Grid item xs={12} sm={4}>
                        <Button type="submit" variant="contained" size="large" form="login-form" fullWidth>Login</Button>
                    </Grid>
                </Grid>
            </div>
        </Card>
    )
}