import {ListElementDetails} from "../commons/layouts/ListElementDetails";
import {CardContent, Divider, Grid, Typography, Button} from "@material-ui/core";
import {FileViewerWrapper} from "./FileViewerWrapper";
import {processAPI} from "../../utils/apis/ProcessAPI";
import { useState, useEffect } from 'react'
import { AssignTasks } from "../tasks/AssignTasks";
import { tasksApi } from "../../utils/apis/tasksAPI";
import { useDevPassword } from "../../utils/hooks/useDevPassword";

export const DevApplicationDetails = ({devApplication}) => {

    const application = devApplication?.application

    const { getEncoded } = useDevPassword()
    const devPassword = getEncoded()

    const [openAssignTasks, setOpenAssignTasks] = useState(false)
    const [alreadyAssignedTasks, setAlreadyAssignedTasks] = useState([])
    const [organizationTasks, setOrganizationTasks] = useState([])
    const [reload, setReload] = useState(false)

    const getSeekerFiles = () => {
        return application.seekerFiles
            .map((file, idx) => (
                <Grid item key={idx} xs={12} md={6}>
                    <FileViewerWrapper undecodedFile={file}/>
                </Grid>))
    }

    useEffect(() => {
        tasksApi.getTasksFromOrganization(devApplication.organizationUUID, devPassword)
            .then(data => setOrganizationTasks(data))
        tasksApi.getTasksFromTaskStage(devApplication.taskStageUUID, devPassword)
            .then(data => setAlreadyAssignedTasks(data))
    }, [devApplication, reload])

    const assignTask = () => {
        setOpenAssignTasks(true)
    }

    const getCardContent = () => {
        return (<CardContent>
            <Grid container direction="row" spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}
                              style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div>
                                <Typography
                                    variant="h6">{application.jobSeeker.user.firstName} {application.jobSeeker.user.lastName}</Typography>
                            </div>
                            <div>
                                <Typography variant="h6" color="textSecondary">{application.offerName || devApplication?.position}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12}
                              style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div>
                                <Typography>{application.jobSeeker.user.mail}</Typography>
                            </div>
                            <div>
                                <Typography color="textSecondary">{processAPI.prepareDate(new Date(application.applicationDate))}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>
                        <Grid item xs={8}>
                            {
                                application.seekerFiles.length === 0 ?
                                    <Typography>Candidate didn't supply any files.</Typography> :
                                    <Grid container direction="row" spacing={4}>
                                        {getSeekerFiles()}
                                    </Grid>
                            }
                        </Grid>
                        <Grid item xs={12}>
{/*                         UNCOMMENT AFTER MERGE WITH NOTES - ES-231 I THINK SO
                            <div style={{display: 'flex', gap: '1em', flexFlow: 'row wrap'}}>
                            {
                                notes.map(note => <SingleNote note={note} />)
                            }
                            </div>
                             */}
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={assignTask}>Assign Task</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>)
    }

    return (
        <div>
            <ListElementDetails cardContent={getCardContent()}/>
            <AssignTasks
                modalOptions={{open: openAssignTasks, handleClose: () => setOpenAssignTasks(false)}}
                alreadyAssignedTasks={alreadyAssignedTasks}
                organizationTasks={organizationTasks}
                setReload={setReload}
                assignKey="taskStage"
                assignUUIDValue={devApplication.taskStageUUID}
            />
        </div>
    )
}