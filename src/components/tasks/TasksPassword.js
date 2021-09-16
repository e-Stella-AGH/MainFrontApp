import {useState} from "react";
import {Button, Card, CardActions, CardContent, TextField, Typography} from "@material-ui/core";

export const TasksPassword = ({ handleSubmit }) => {

    const [password, setPassword] = useState("")

    return (
        <Card variant="outlined" style={{width: '40%', marginTop: '3em', marginLeft: 'auto', marginRight: 'auto', padding: '2em'}}>
            <CardContent style={{marginBottom: '1em'}}>
                <div style={{width: '60%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '1em'}}>
                    <Typography variant="h6">
                        We need to validate, who you are, so please, provide password from your mail:
                    </Typography>
                </div>
                <TextField
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                    variant="outlined"
                    label="Password from email"
                    fullWidth
                />
            </CardContent>
            <CardActions style={{width: '40%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Button onClick={() => handleSubmit(password)} variant="contained" color="primary" fullWidth>
                    Go!
                </Button>
            </CardActions>
        </Card>
    )
}