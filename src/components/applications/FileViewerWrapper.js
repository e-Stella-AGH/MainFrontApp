import React, {useState} from 'react'
import {Button, Grid, Typography} from "@material-ui/core";
import {GenericFileViewer} from "../commons/GenericFileViewer";

export const FileViewerWrapper = ({undecodedFile}) => {

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Grid container direction="row" spacing={1} alignItems = "center">
            <Grid item xs={6}><Typography>{undecodedFile.fileName}</Typography></Grid>
            <Grid item xs={6}>
                <Button color="primary" variant="outlined" onClick={handleOpen}>
                    View File
                </Button>
            </Grid>
            <GenericFileViewer handleClose={handleClose} open={open} file={undecodedFile}/>
        </Grid>
    )
}