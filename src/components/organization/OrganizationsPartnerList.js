import {Controller, useForm} from "react-hook-form";
import {Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {withSwal} from "../formsCommons/WithSwal";
import React, {useEffect} from "react";
import ClearIcon from "@material-ui/icons/Clear";
import {OrganizationPartner} from "./OrganizationPartner";

export const OrganizationsPartnerList = (props) => {

    const id = props.organizationId
    useEffect(() => {

        if(id !== undefined){
            usersAPI.getHrPartnersByOrganization(id)
                .then(data => updateOffer(data))
        }
    }, [id])

    const defaultFormState = {
        firstName: "",
        lastName: "",
        mail: ""
    }

    const onSubmit = (data) => {
        withSwal({
            loadingTitle: "Adding HR user",
            promise: () => props.onSubmit(data),
            successSwalTitle: "Success",
            successSwalText: "You've successfully added HR user!",
            successFunction: () => reset(),
            errorSwalTitle: "We couldn't save this user for you"
        })
        if(props.onSubmit){
            props.onSubmit(data)
        }
    }



    const users = props.users || []
    const {handleSubmit, control, reset} = useForm({defaultValues:defaultFormState})

    const onUserAdd = (data) => {
        withSwal({
            loadingTitle: "Adding HR user",
            promise: () => props.onSubmit(data),
            successSwalTitle: "Success",
            successSwalText: "You've successfully added HR user!",
            successFunction: () => {
                props.onChange(users.concat([data]))
                reset()
            },
            errorSwalTitle: "We couldn't save this user for you"
        })
        if(props.onSubmit){
            props.onSubmit(data)
        }
    }

    const onUserDelete = (idx, data) => {
        withSwal({
            loadingTitle: "Deleting HR user",
            promise: () => props.onDelete(data),
            successSwalTitle: "Success",
            successSwalText: "You've successfully deleted HR user!",
            successFunction: () => {
                props.onChange(users.slice(0, idx).concat(users.slice(idx+1, undefined)))
                reset()
            },
            errorSwalTitle: "We couldn't delete this user for you"
        })
        if (props.onDelete) {
            props.onDelete(data)
        }
    }


    // return <div style={{width: "90%", marginRight: "auto", marginLeft: "auto", padding: "10px", paddingBottom: "30px"}}>
    //     <form id="offer-form" name="offer-form" onSubmit={handleSubmit(onSubmit)}/>
    // <Controller
    //     name="partners"
    //     control={control}
    //     defaultValue={[]}
    //     render={({field: {onChange, value}}) =>
    //         <OfferFormSkillList onChange={onChange} value={value} />
    //     }
    // />
    //     </div>

    return <>
        <form id="user-form" name="user-form" onSubmit={handleSubmit(onUserAdd)}></form>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                name="lastName"
                rules={{required: true}}
                defaultValue={defaultFormState.lastName}
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
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                name="mail"
                rules={{required: true, validate: (mail) => !users.some(u => u.mail === mail)}}
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
        <Grid item xs={12}>
            <Box mt={0} mb={0}>
                <Grid container>
                    {users.map((user, idx) =>
                        <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                            <Grid container>
                                <Grid item xs={11}>
                                    {/*<OfferSkill key={idx} name={skill.name} skillLevel={skill.level}/>*/}
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
    </>
}