import { Chip, Grid, Avatar, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    chip: {
      margin: theme.spacing(0.5)
    }
}))

export const OfferFormSkill = (props) => {
    const classes = useStyles()
    return <Grid item xs={12}>
        <Chip 
            avatar={<Avatar>{props.level}</Avatar>} 
            label={props.skill} 
            className={classes.chip} 
            {...props.chipProps} />
    </Grid>
}