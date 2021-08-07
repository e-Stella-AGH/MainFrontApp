import React from 'react'
import {Button, Grid, Typography} from "@material-ui/core";

export const FileViewer = ({undecodedFile}) => {

    console.log(undecodedFile)

    return (
        <Grid container direction="row" spacing={1} align = "center" justify = "center" alignItems = "center">
            <Grid item><Typography>FileName</Typography></Grid>
            <Grid item>
                <Button color="primary" variant="outlined">
                    View File
                </Button>
            </Grid>
        </Grid>
    )
}