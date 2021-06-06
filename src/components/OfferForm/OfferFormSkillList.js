import { Paper, makeStyles, TextField, Select, MenuItem, Grid, Button, InputLabel, FormControl } from "@material-ui/core"
import { Controller, useForm } from "react-hook-form"
import { OfferFormSkill } from "./OfferFormSkill"

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    }, 
    button: {
        height: '97%'
    }
}))

const skillLevels = {
    'NICE_TO_HAVE': 1,
    'JUNIOR': 2,
    'REGULAR': 3,
    'ADVANCED': 4,
    'MASTER': 5
}

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
        {skills.length !== 0 && <Grid item xs={12}>
            <Paper component="ul" className={classes.root}>
                {skills.map((skill, index) => 
                    <li key={index}>
                        <OfferFormSkill 
                            skill={skill.name} 
                            level={skillLevels[skill.level]} 
                            chipProps={{onDelete: () => onSkillDelete(index)}} 
                        />
                    </li>
                )}
            </Paper>
        </Grid>}
        </>
}