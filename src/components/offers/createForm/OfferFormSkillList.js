import { makeStyles, TextField, Select, MenuItem, Grid, Button, InputLabel, FormControl, Box, IconButton } from "@material-ui/core"
import ClearIcon from '@material-ui/icons/Clear';
import { Controller, useForm } from "react-hook-form"
import { OfferSkill } from "../details/OfferSkill"

const useStyles = makeStyles((theme) => ({
    button: {
        height: '97%'
    }
}))

export const OfferFormSkillList = (props) => {
    const classes = useStyles()

    const defaultFormState = {name: "", level: ""}
    const skills = props.value || []
    const {handleSubmit, control, reset} = useForm({defaultValues:defaultFormState})

    const onSkillAdd = (data) => {
        props.onChange(skills.concat([data]))
        reset()
    }

    const onSkillDelete = (idx) => {
        props.onChange(skills.slice(0, idx).concat(skills.slice(idx+1, undefined)))
    }

    return <>
        <form id="skill-form" name="skill-form" onSubmit={handleSubmit(onSkillAdd)}></form>
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                name="name"
                rules={{required: true, validate: (skill) => !skills.some(s => s.name === skill)}}
                defaultValue={defaultFormState.name}
                render={({field}) => 
                    <TextField
                        {...field}
                        label="Skill"
                        variant="outlined"
                        form="skill-form"
                        fullWidth />
                } 
            />
        </Grid>

        <Grid item xs={12} sm={3}>
            <FormControl variant="outlined" form="skill-form" fullWidth>
                <InputLabel>Skill level</InputLabel>
                <Controller
                    control={control}
                    name="level"
                    rules={{required: true}}
                    defaultValue={defaultFormState.level}
                    render={({field}) => 
                        <Select {...field} label="Skill level" form="skill-form">
                            <MenuItem value='NICE_TO_HAVE'>Nice to have</MenuItem>
                            <MenuItem value='JUNIOR'>Junior</MenuItem>
                            <MenuItem value='REGULAR'>Regular</MenuItem>
                            <MenuItem value='ADVANCED'>Advanced</MenuItem>
                            <MenuItem value='MASTER'>Master</MenuItem>
                        </Select>
                    } 
                />
            </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
            <Button 
                className={classes.button}
                type="submit" 
                variant="contained" 
                form="skill-form"
                fullWidth>Add skill</Button>
        </Grid>
        <Grid item xs={12}>
            <Box mt={0} mb={0}>
                <Grid container>
                    {skills.map((skill, idx) =>
                        <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
                            <Grid container>
                                <Grid item xs={11}>
                                    <OfferSkill key={idx} name={skill.name} skillLevel={skill.level}/>
                                </Grid>
                                <Grid item xs={1}>
                                    <Box mt={3}>
                                        <IconButton aria-label="delete" style={{padding:"0px"}} onClick={() => onSkillDelete(idx)}>
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