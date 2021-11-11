import {useState} from "react";
import {Button, Card, CardActions, CardContent, TextField, Typography} from "@material-ui/core";
import {keys, useKeyPress} from "../../utils/hooks/useKeyPress";

export const TasksPassword = ({ handleSubmit }) => {

    const [password, setPassword] = useState("")

    const handleKeyPress = (event) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useKeyPress(keys.Enter, event, () => handleSubmit(password))
    }

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
                    onKeyPress={handleKeyPress}
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