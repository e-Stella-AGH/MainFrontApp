import {ManageStages} from "./ManageStages";
import { Divider, Grid, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import HelpIcon from '@material-ui/icons/Help';
import Swal from "sweetalert2";
import {useEffect, useState} from "react";
import {processAPI} from "../../../utils/apis/ProcessAPI";
import { Dates } from "./Dates";

export const ManageProcess = () => {

    const {id} = useParams()
    const [process, setProcess] = useState(null)

    const [reload, setReload] = useState(false)

    useEffect(() => {
        processAPI.getProcessById(id)
            .then(data => {
                setProcess(data)
            })
    }, [id, reload])

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
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} direction="column">
                        <Grid item style={{marginLeft: "1em", marginRight: "auto"}}>
                            <Grid item><Typography variant="h5">Recruitment Process Settings</Typography></Grid>
                        </Grid>
                        <Grid item> <Divider/> </Grid>

                        <Grid item style={{marginLeft: "1em", marginRight: "1em", marginTop: '1em'}}>
                            <Dates process={process} reload={reload} setReload={setReload} />
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
                        <Grid item> <Divider/> </Grid>
                        <Grid item style={{marginTop: '1em'}}>
                            <ManageStages processId={id}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}