import {constants} from "../../utils/constants";
import { Grid, Typography, Box, Button, Divider } from '@material-ui/core'
import { EStellaAutocomplete } from "../EStellaAutocomplete";
import { useState } from 'react';
import { NotesList } from './NotesList'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { AddNote } from './AddNote'


export const NotesMenu = ({ notes, uuid, uuid_key, reload, setReload }) => {

    const [tag, setTag] = useState('')
    const [showAdd, setShowAdd] = useState(false)

    const getDistinctTags = () => new Array(...new Set(notes.flatMap(note => note.tags)))

    const getNotes = () => tag ? notes.filter(note => note.tags.includes(tag)) : notes

    const addNote = () => {
        setShowAdd(true)
    }

    return (
        <div style={{marginTop: `calc(${constants.navbar_height} + 3em)`, textAlign: 'center'}}>
            
            <Grid container direction="row">
                <Grid item xs={11}>
                    <Typography variant="h5">
                        Notes
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Button onClick={addNote}><AddCircleOutlineIcon color="action" /></Button>
                </Grid>
            </Grid>

            { showAdd && <AddNote onCancel={() => setShowAdd(false)} uuid={uuid} uuid_key={uuid_key} setReload={setReload} /> }

            <Divider style={{marginTop: '1em'}} />

            <Box m={2}>
                <EStellaAutocomplete options={getDistinctTags()} label={"Search for tags"} onChange={(value) => setTag(value)} />
            </Box>

            {notes?.length > 0 ? <NotesList notes={getNotes()} /> : 'Oh no, there are no notes yet!' }
        </div>
    )
}