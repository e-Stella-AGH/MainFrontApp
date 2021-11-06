import { Card, Chip, Divider, CardContent, Typography } from '@material-ui/core';
import { decode } from '../../utils/hooks/Base64'
import { TagsList } from './TagsList'

export const Note = ({ note }) => {

    return (
        <Card variant="outlined" style={{padding: '2em', width: '80%'}}>
            <Typography variant="h6" color="textSecondary">{note.author}</Typography>
            <TagsList tags={note.tags} />
            <Divider />
            <CardContent>
                {decode(note.text)}
            </CardContent>
        </Card>
    )
}