import { Typography, Button } from '@material-ui/core'
import {useHistory} from 'react-router-dom'

export const Page404 = () => {

    const history = useHistory()

    const redirectToMainPage = () => history.push('/')

    return (
        <div style={{textAlign: 'center', marginTop: '2em'}}>
            <Typography variant="h5" style={{margin: '1em'}}>
                Holy cow that's outta space!
            </Typography>
            <img src="https://i.pinimg.com/736x/66/f6/23/66f623dc35c80dbf8901b40cb0410278.jpg" alt="Holy Cow that's outta space" width="27%" />
            <Typography variant="h6" color="textSecondary" style={{margin: '1em'}}>
                Let us take you back to main page
            </Typography>
            <Button onClick={redirectToMainPage} color="primary" variant="contained" size="large">Take me back</Button>
        </div>
    )
}