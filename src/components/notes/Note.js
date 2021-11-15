import {Card, CardContent, Divider, Typography} from '@material-ui/core';
import {decodeBase64} from '../../utils/hooks/Base64'
import {TagsList} from './TagsList'

export const Note = ({ note }) => {

    return (
        <Card variant="outlined" style={{padding: '2em', width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Typography variant="h6" color="textSecondary">{note.author}</Typography>
            <TagsList tags={note.tags} />
            <Divider />
            <CardContent>
                <Typography style={{whiteSpace:'pre-wrap'}}>{decodeBase64(note.text)}</Typography>
            </CardContent>
        </Card>
    )
}