import {ManageStages} from "./ManageStages";
import {Button, Divider, Grid, Typography} from "@material-ui/core";
import {Redirect, useParams} from "react-router-dom";
import HelpIcon from '@material-ui/icons/Help';
import Swal from "sweetalert2";
import {ManageEndDate} from "./ManageEndDate";
import React, {useEffect, useState} from "react";
import {processAPI} from "../../../utils/apis/ProcessAPI";
import {withSwal} from "../../commons/formsCommons/WithSwal";
import CenteredCircularProgress from "../../commons/CenteredCircularProgress";

export const ManageProcess = () => {

    const {id} = useParams()
    const [fetchError, setFetchError] = useState(false)
    const [process, setProcess] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)

    useEffect(() => {
        processAPI.getProcessById(id)
            .then(data => {
                setProcess(data)
                setSelectedEndDate(data?.endDate || new Date())
            })
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "We were unable to get this process! You will be redirected to home page",
                    icon: "error"
                }).then(() => setFetchError(true))
            })
    }, [id])

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

    const handleSubmit = () => {
        withSwal({
            loadingTitle: "Updating end date",
            promise: () => processAPI.changeEndDate(id, selectedEndDate),
            successSwalTitle: "Date updated"
        })
    }

    const ManageProcessInside = () =>
        process == null ? <CenteredCircularProgress size={80} /> : <div style={{marginLeft: "1em", marginRight: "1em"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} direction="column">
                        <Grid item style={{marginLeft: "1em", marginRight: "auto"}}>
                            <Grid item><Typography variant="h5">Recruitment Process Settings</Typography></Grid>
                        </Grid>
                        <Grid item> <Divider/> </Grid>
                        <Grid container style={{display: "flex", flexGrow: 1}}>
                            {/*<Grid item>*/}
                            {/*  Beginning of recruitment process in future maybe  */}
                            {/*</Grid>*/}
                            <Grid item>
                                <ManageEndDate selectedDate={selectedEndDate || new Date()}
                                               onChange={(date) => setSelectedEndDate(date)}
                                               processStartDate={process?.startDate}/>
                            </Grid>
                        </Grid>
                        {/*<Grid item>*/}
                        {/*    In future tasks and quizzes? */}
                        {/*</Grid>*/}
                        <Grid item>
                            <Grid container direction="row">
                                <Grid item xs={false} sm={6} lg={8}/>
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
                        <Grid item> <Divider/> </Grid>
                        <Grid item>
                            <ManageStages processId={id} processData={process}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>

    return fetchError ? <Redirect to="/" /> : <ManageProcessInside />
}