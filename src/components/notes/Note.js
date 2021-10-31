import { Card, Chip, Divider, CardContent, Typography } from '@material-ui/core';
import { decode } from '../../utils/hooks/Base64'

export const Note = ({ note }) => {

    return (
        <Card variant="outlined" style={{padding: '2em', width: '80%'}}>
            <Typography variant="h6" color="textSecondary">{note.author}</Typography>
            <div style={{display: 'flex', overflow: 'scroll'}}>
                {note.tags.map((tag, idx) => (<Chip style={{margin: '10px'}} label={tag} variant="outlined" color="primary" />))}
            </div>
            <Divider />
            <CardContent>
                {decode(note.text)}
            </CardContent>
        </Card>
    )
}