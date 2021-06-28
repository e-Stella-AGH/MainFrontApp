import {useForm} from "react-hook-form";
import {withSwal} from "../../formsCommons/WithSwal";
import {loginAPI} from "../../../utils/apis/LoginAPI";
import {Button, Card, Grid, Typography} from "@material-ui/core";
import {FormField} from "../../formsCommons/FormField";
import {useHistory} from "react-router-dom";

export const CompanyRegistration = (props) => {

    const defaultFormState = {
        name: "",
        email: "",
        password: ""
    }

    const history = useHistory()

    const { handleSubmit, control, reset } = useForm({mode: "onChange", defaultValues: defaultFormState})

    const onSubmit = (data) => {
        withSwal({
            loadingTitle: "Registering...",
            promise: () => loginAPI.registerUser(data.login, data.password, data.firstName, data.lastName),
            successSwalTitle: "Successfully registered!",
            successSwalText: "Your company was successfully registered and now it's waiting for our verification. Please, be patient and wait for email from us!",
            confirmButtonText: "Back to main page",
            successFunction: () => {
                reset()
                history.push("/")
            },
            errorSwalTitle: "We couldn't register you!"
        })
    }

    return (
        <Card variant="outlined" style={{width: "60%", marginLeft: "auto", marginRight: "auto", padding: "30px 10px"}}>
            <Typography variant="h5" style={{marginBottom: "20px", marginLeft: "auto", marginRight: "auto", width: "80%"}}>Register your company!</Typography>
            <div style={{width: "80%", marginRight: "auto", marginLeft: "auto", padding: "10px", paddingBottom: "30px"}}>
                <form id="company-register-form" name="company-register-form" onSubmit={handleSubmit(onSubmit)} />

                <Grid container spacing={2}>
                    <FormField
                        control={control}
                        name="email"
                        rules={{
                            required: {value: true, message: "Required field"},
                            pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Login is your email, so it must be a valid email"}
                        }}
                        defaultValue=""
                        additionalTextFieldProps={{
                            label: "Email",
                            form: "company-register-form"
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
                            form: "company-register-form",
                            type: "password"
                        }}
                    />
                    <FormField
                        control={control}
                        name="name"
                        rules={{
                            required: {value: true, message: "Required field"},
                        }}
                        defaultValue=""
                        additionalTextFieldProps={{
                            label: "Company Name",
                            form: "company-register-form"
                        }}
                    />
                    <Grid item xs={false} sm={8} />
                    <Grid item xs={12} sm={4}>
                        <Button type="submit" variant="contained" size="large" form="company-register-form" fullWidth>Register</Button>
                    </Grid>
                </Grid>

            </div>
        </Card>
    )

}