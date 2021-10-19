import {ManageStages} from "./ManageStages";
import {Button, Divider, Grid, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import HelpIcon from '@material-ui/icons/Help';
import Swal from "sweetalert2";
import {ManageDate} from "./ManageDate";
import {useEffect, useState} from "react";
import {processAPI} from "../../../utils/apis/ProcessAPI";
import {withSwal} from "../../commons/formsCommons/WithSwal";

export const ManageProcess = () => {

    const {id} = useParams()
    const [process, setProcess] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)

    const [reload, setReload] = useState(false)

    console.log(process)

    useEffect(() => {
        processAPI.getProcessById(id)
            .then(data => {
                setProcess(data)
                setSelectedEndDate(data?.endDate || new Date())
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

    const handleSubmit = () => {
        withSwal({
            loadingTitle: "Updating end date",
            promise: () => processAPI.changeEndDate(id, selectedEndDate),
            successSwalTitle: "Date updated"
        })
    }

    const startProcess = () => {
        if (!process.endDate) {
            Swal.fire({
                title: "End date is not set!",
                text: `Please, pick end date of recruitment process, as you won't be able to change it after process is started.`,
                icon: 'error'
            })
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: `You won't be able to modify this process after it's started.`,
                icon: 'warning',
                showCancelButton: true
            }).then(result => {
                if(result.isConfirmed) {
                    withSwal({
                        loadingTitle: "Starting process",
                        promise: () => processAPI.startProcess(process.id),
                        successSwalTitle: "Process Started!",
                        successFunction: () => setReload(!reload)
                    })
                }
            })
        }
    }

    const isProcessStarted = () => process?.startDate != null

    return (
        <div style={{marginLeft: "1em", marginRight: "1em"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} direction="column">
                        <Grid item style={{marginLeft: "1em", marginRight: "auto"}}>
                            <Grid item><Typography variant="h5">Recruitment Process Settings</Typography></Grid>
                        </Grid>
                        <Grid item> <Divider/> </Grid>
                        <div style={{display: 'inline-block'}}>
                            <div style={{ float: 'left', marginLeft: '4em', marginTop: '1em' }}>
                                <Button variant="contained" color="primary" size="large" onClick={startProcess} disabled={isProcessStarted()}>Start Process</Button>
                            </div>
                            <div style={{ float: 'right', marginRight: '4em' }}>
                                <ManageDate selectedDate={selectedEndDate}
                                                onChange={(date) => setSelectedEndDate(date)}
                                                processStartDate={process?.startDate}
                                />
                            </div>
                        </div>

                        {/*<Grid item>*/}
                        {/*    In future tasks and quizzes? */}
                        {/*</Grid>*/}
                        <Grid item>
                            <Grid container direction="row">
                                <Grid item xs={false} sm={6} lg={8}/>
                                <Grid item xs={12} sm={6} lg={4}>
                                    <Button onClick={handleSubmit} variant="outlined" disabled={isProcessStarted()}>Submit</Button>
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
                            <ManageStages processId={id}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}