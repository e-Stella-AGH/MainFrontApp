import { useForm, Controller } from "react-hook-form"
import { Grid, Button, makeStyles } from "@material-ui/core"
import { OfferFormField } from "./OfferFormField"
import { useEffect } from "react"
import { OfferFormSkillList } from "./OfferFormSkillList"

const useStyles = makeStyles((theme) => ({
    button: {
        height: '100%'
    }
}))

export const OfferForm = (props) => {
    const defaultFormState = {
        name:"",
        position:"",
        localization:"",
        minSalary:"",
        maxSalary:"",
        description:"",
        skills:[]
    }
    const {handleSubmit, watch, trigger, control, reset} = useForm({mode: "onChange", defaultValues:defaultFormState})

    const minSalary = watch("minSalary", null)
    const maxSalary = watch("maxSalary", null)

    const classes = useStyles()

    useEffect(() => {if(maxSalary) trigger("minSalary")}, [trigger, maxSalary])
    useEffect(() => {if(minSalary) trigger("maxSalary")}, [trigger, minSalary])

    const onSubmit = (data) => {
        const formResult = Object.assign(data, {
            minSalary: parseInt(data.minSalary),
            maxSalary: parseInt(data.maxSalary)
        })
        reset()
        if(props.onSubmit){
            props.onSubmit(data)
        }
    }

    return <>
        <form id="offer-form" name="offer-form" onSubmit={handleSubmit(onSubmit)}></form>
        <Grid container spacing={2}>
            <OfferFormField
                control={control}
                name="name"
                rules={{
                    required: {value: true, message: "Required field"}
                }} 
                defaultValue=""
                additionalTextFieldProps={{
                    label:"Offer name",
                    autoComplete: "off",
                    form:"offer-form"
                }} />
            <OfferFormField
                control={control}
                name="position"
                rules={{
                    required: {value: true, message: "Required field"}
                }} 
                defaultValue=""
                additionalTextFieldProps={{
                    label:"Position",
                    autoComplete: "off",
                    form:"offer-form"
                }} />
            <OfferFormField
                control={control}
                name="localization"
                rules={{
                    required: {value: true, message: "Required field"}
                }} 
                additionalTextFieldProps={{
                    label:"Location",
                    autoComplete: "off",
                    form:"offer-form"
                }} />
            <OfferFormField
                control={control}
                name="minSalary"
                rules={{
                    required: {value: true, message: "Required field"},
                    pattern: {value: /^[1-9]\d*$/, message: "Must be a positive number"},
                    max: {value: maxSalary, message: "Maximum salary cannot be lower than minimum"}
                }} 
                defaultValue=""
                additionalTextFieldProps={{
                    label:"Minimum salary",
                    autoComplete: "off",
                    form:"offer-form"
                }}
                additionalGridProps={{
                    xs:12,
                    sm:6
                }} />
            <OfferFormField
                control={control}
                name="maxSalary"
                rules={{
                    required: {value: true, message: "Required field"},
                    pattern: {value: /^[1-9]\d*$/, message: "Must be a positive number"},
                    min: {value: minSalary, message: "Maximum salary cannot be lower than minimum"}
                }} 
                defaultValue=""
                additionalTextFieldProps={{
                    label:"Maximum salary",
                    autoComplete: "off",
                    form:"offer-form"
                }}
                additionalGridProps={{
                    xs:12,
                    sm:6
                }} />
            <OfferFormField
                name="description"
                control={control}
                rules={{required: {value: true, message: "Required field"}}}
                defaultValue=""
                additionalTextFieldProps={{
                    multiline: true,
                    rows: 8,
                    rowsMax: 8,
                    autoComplete: "off",
                    label:"Short description",
                    form:"offer-form"
                }}/>
            <Controller
                name="skills"
                control={control}
                defaultValue={[]}
                render={({field: {onChange, value}}) => 
                    <OfferFormSkillList onChange={onChange} value={value} />
                }
            />
            <Grid item xs={false} sm={8} />
            <Grid item xs={12} sm={4}>
                <Button className={classes.button} type="submit" variant="contained" size="large" form="offer-form" fullWidth>Create offer</Button>
            </Grid>
        </Grid></>
}