import {ManageStages} from "./ManageStages";
import {Divider, Grid, Typography} from "@material-ui/core";

export const ManageProcess = () => {

    return (
        <div style={{marginLeft: "1em", marginRight: "1em"}}>
            <Grid container>
                <Grid item xs={12} sm={6} />
                <Grid item xs={12} sm={6}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item style={{marginLeft: "auto", marginRight: "2em"}}>
                            <Typography variant="h6">Stages</Typography>
                        </Grid>
                        <Grid item> <Divider /> </Grid>
                        <Grid item>
                            <ManageStages />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}