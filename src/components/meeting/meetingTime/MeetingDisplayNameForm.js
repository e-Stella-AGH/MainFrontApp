import {useState} from "react";
import {Box, Button, TextField, Typography, useTheme} from "@material-ui/core";

export const MeetingDisplayNameForm = (props) => {

    const theme = useTheme()

    const [name, setName] = useState("")

    const handleClick = () => {
        props.onSubmit(name)
    }

    return (
        <div style={{textAlign: "center"}}>
            <Box mt={10} mb={5} style={{textAlign: "left", marginLeft: "30%"}}>
                <Typography variant="h4">
                    One more step...
                </Typography>
            </Box>
            <Box mb={5} m={2} style={{textAlign: "left", marginLeft: "31%", color: theme.palette.text.secondary}}>
                <Typography variant="h5">
                    How should we call you?
                </Typography>
            </Box>
            <Box mt={5} m={5}>
                <TextField
                    value={name}
                    onChange={({target}) => setName(target.value)}
                    label="Your name"
                />
            </Box>
            <Box m={5}>
                <Button variant="contained" color="primary" onClick={handleClick}>Submit</Button>
            </Box>
        </div>
    )
}