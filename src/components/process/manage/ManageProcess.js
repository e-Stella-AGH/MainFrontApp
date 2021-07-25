import {ManageStages} from "./ManageStages";
import {Divider, Grid, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import HelpIcon from '@material-ui/icons/Help';
import Swal from "sweetalert2";

export const ManageProcess = () => {

    const {id} = useParams()

    const showHelp = () => {
        Swal.fire({
            title: "Help",
            icon: "question",
            html: 'Here are some most commons tips:<br>' +
                '<ul>' +
                '<li>To delete stage from right list, simply drag it outside the list</li>' +
                '<li>Remember that you cannot insert before APPLIED stage and after ENDED stage</li>' +
                '</ul>'
        })
    }

    return (
        <div style={{marginLeft: "1em", marginRight: "1em"}}>
            <Grid container>
                <Grid item xs={12} sm={6} />
                <Grid item xs={12} sm={6}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item style={{marginLeft: "auto", marginRight: "2em"}}>
                            <Grid container direction="row" spacing={1}>
                                <Grid item><Typography variant="h6">Stages</Typography></Grid>
                                <Grid item><HelpIcon onClick={showHelp} color="primary"/></Grid>
                            </Grid>
                        </Grid>
                        <Grid item> <Divider /> </Grid>
                        <Grid item>
                            <ManageStages processId={id} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}