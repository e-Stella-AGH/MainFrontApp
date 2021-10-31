import {constants} from "../../utils/constants";
import { Note } from './Note';
import { Grid, Typography } from '@material-ui/core'

export const NotesMenu = ({ notes }) => {

    const notesView = (
        <Grid container>
            {notes.map((note, idx) => (
                <Grid item xs={12} sm={5} style={{margin: '1em'}}>
                    <Note note={note} key={idx} />
                </Grid>
            ))}
        </Grid>
    )

    return (
        <div style={{marginTop: `calc(${constants.navbar_height} + 3em)`, textAlign: 'center'}}>
            <Typography variant="h5">
                Notes
            </Typography>
            {notesView}
        </div>
    )
}