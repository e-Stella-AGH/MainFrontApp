import {ManageStages} from "./ManageStages";
import {Button, Divider, Grid, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import HelpIcon from '@material-ui/icons/Help';
import Swal from "sweetalert2";
import {ManageEndDate} from "./ManageEndDate";
import {useState} from "react";

export const ManageProcess = () => {

    const {id} = useParams()

    const [selectedEndDate, setSelectedEndDate] = useState(new Date())

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

    //TODO - change it, when ES-180 will be ready or ouch XD
    const handleSubmit = () => {
        Swal.fire({
            title: "Ouch",
            text: "Looks like I wasn't implemented yet. Check if backend can handle me!",
            icon: "info"
        })
    }

    return (
        <div style={{marginLeft: "1em", marginRight: "1em"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} direction="column">
                        <Grid item style={{marginLeft: "1em", marginRight: "auto"}}>
                            <Grid item><Typography variant="h5">Recruitment Process Settings</Typography></Grid>
                        </Grid>
                        <Grid item> <Divider /> </Grid>
                        <Grid container style={{display: "flex", flexGrow: 1}}>
                            {/*<Grid item>*/}
                            {/*    Tu w przyszłości początek procesu rekrutacyjnego*/}
                            {/*</Grid>*/}
                            <Grid item>
                                <ManageEndDate selectedDate={selectedEndDate} onChange={(date) => setSelectedEndDate(date)} />
                            </Grid>
                        </Grid>
                        {/*<Grid item>*/}
                        {/*    W przyszłości pewnie taski + quizy?*/}
                        {/*</Grid>*/}
                        <Grid item>
                            <Grid container direction="row">
                                <Grid item xs={false} sm={6} lg={8} />
                                <Grid item xs={12} sm={6} lg={4}>
                                    <Button onClick={handleSubmit} variant="outlined">Submit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
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