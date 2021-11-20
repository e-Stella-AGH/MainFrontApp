import {Card, Typography, useTheme} from '@material-ui/core'

export const SingleResult = ({ result }) => {

    const theme = useTheme()

    console.log(result)

    const getBackgroundColor = () => result?.err || !result?.passed ? theme.status.danger.light : theme.status.success.light

    const getText = () => result?.err ? `Error: ${result.err}` : `Result: ${result.result}`

    return (
        <Card style={{backgroundColor: getBackgroundColor(), margin: '1em 0', padding: '1em', height: '8vh', alignItems: 'center', display: 'flex'}}>
            <Typography variant="body1">
                {getText()}
            </Typography>
        </Card>
    )
}