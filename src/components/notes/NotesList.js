import {Grid} from '@material-ui/core';
import {Note} from './Note';

export const NotesList = ({notes}) => {

    return (
        <Grid container>
            {notes.map((note, idx) => (
                <Grid item xs={12} sm={5} style={{margin: '1em'}}>
                    <Note note={note} key={idx} />
                </Grid>
            ))}
        </Grid>
    )
}