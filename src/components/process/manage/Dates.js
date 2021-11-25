import {ManageDate} from "./ManageDate";
import {Button, Card, CardContent, Divider, Grid, Typography} from "@material-ui/core";
import Swal from "sweetalert2";
import {useState} from "react";
import {processAPI} from "../../../utils/apis/ProcessAPI";
import {withSwal} from "../../commons/formsCommons/WithSwal";

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export const Dates = ({ process, reload, setReload }) => {

    const getDateOrDefault = (stringDate, shouldAddDayToDefault = false) => !!stringDate ? new Date(stringDate) : shouldAddDayToDefault ? new Date().addDays(1) : new Date()

    const [selectedEndDate, setSelectedEndDate] = useState(getDateOrDefault(process?.endDate))
    const [selectedStartDate, setSelectedStartDate] = useState(getDateOrDefault(process?.startDate, true))
    
    const isProcessStarted = () => process?.startDate != null && new Date(process?.startDate) <= new Date()

    const startProcess = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to modify stages after you start your process",
            icon: "warning",
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

    const handleEndSubmit = () => {
        if (selectedEndDate) {
            withSwal({
                loadingTitle: "Updating end date",
                promise: () => processAPI.changeEndDate(process.id, selectedEndDate),
                successSwalTitle: "Date updated",
                successFunction: () => setReload(!reload)
            })
        } else {
            fireInvalidDateSwal()
        }
    }

    const handleStartSchedule = () => {
        !!selectedStartDate ? 
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to modify stages after the date your process will start",
            icon: "warning",
            showCancelButton: true
        }).then(result => {
            if(result.isConfirmed) {
                withSwal({
                    loadingTitle: "Updating start date",
                    promise: () => processAPI.changeStartDate(process.id, selectedStartDate),
                    successSwalTitle: "Date updated",
                    successFunction: () => setReload(!reload)
                })      
            }
        }) : fireInvalidDateSwal()
    }

    const fireInvalidDateSwal = () => {
        Swal.fire({
            title: "You cannot do this!",
            text: "You forgot to set a date before scheduling!",
            icon: 'error'
        })
    }

    return (
        <>
            <Grid container spacing={3} style={{height: "100%", textAlign: 'center'}} direction="row">
                <Grid item xs={12} sm={6}>
                    <Card style={{width: "100%", height: "100%"}} variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Schedule Start Of Process</Typography>
                            <div style={{display: 'flex', flexFlow: 'row wrap', gap: '1em', alignItems: 'center', justifyContent: 'center'}}>
                                <ManageDate selectedDate={selectedStartDate}
                                        onChange={(date) => setSelectedStartDate(date)}
                                        label="Start of recruitment process"
                                />
                                <Button variant="outlined" color="primary" onClick={handleStartSchedule} disabled={isProcessStarted()}>Schedule</Button>
                            </div>
                            <Divider style={{marginTop: '1em', marginBottom: '1em'}} />
                            <Typography variant="h6" style={{marginBottom: '5px'}}>Or</Typography>
                            <Button variant="contained" color="primary" onClick={startProcess} disabled={isProcessStarted()}>Start your process now!</Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card style={{width: "100%", height: "100%"}} variant="outlined">
                        <CardContent>
                            <Typography variant="h6">Schedule End Of Process</Typography>
                            <div style={{display: 'flex', flexFlow: 'row wrap', gap: '1em', alignItems: 'center', justifyContent: 'center'}}>
                                <ManageDate selectedDate={selectedEndDate}
                                        onChange={(date) => setSelectedEndDate(date)}
                                        processStartDate={process?.startDate}
                                />
                                <Button variant="outlined" color="primary" onClick={handleEndSubmit}>Schedule</Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </>
    )
}
