import {ListElementDetails} from "../commons/layouts/ListElementDetails";
import {Box, Button, CardContent, Divider, Grid, Typography, useTheme} from "@material-ui/core";
import {ApplicationTimeline} from "./ApplicationTimeline";
import {FileViewerWrapper} from "./FileViewerWrapper";
import {withSwal} from "../commons/formsCommons/WithSwal";
import {applicationsAPI} from "../../utils/apis/applicationsAPI";
import Swal from "sweetalert2";
import {processAPI} from "../../utils/apis/ProcessAPI";
import {useHistory} from "react-router-dom";
import {validateEmail} from "../../utils/functions";

export const ApplicationDetails = ({application, isHR, reload}) => {

    const theme = useTheme()
    const history = useHistory()

    const getSeekerFiles = () => {
        return application.seekerFiles
            .map((file, idx) => (
                <Grid item key={`${idx}`} xs={12} md={6}>
                    <FileViewerWrapper undecodedFile={file}/>
                </Grid>))
    }

    const rejectApplication = () => {
        Swal.fire({
            title: "Do you really want to reject this application?",
            text: "This operation cannot be undone",
            showCancelButton: true,
            confirmButtonText: "Reject Application",
            cancelButtonText: "Abort!",
            icon: "question"
        }).then(result => {
            if(result.isConfirmed) {
                withSwal({
                    loadingTitle: "Rejecting Application",
                    promise: () => applicationsAPI.rejectApplication(application.id),
                    successFunction: () => reload(),
                    successSwalText: "Application rejected successfully"
                })
            } else {
                Swal.fire({
                    title: "You've cancelled this operation",
                    text: "Application isn't rejected",
                    icon: "success"
                })
            }
        })
    }

    const nextStage = () => {
        if ( nextStageRequiresDevs() ) {
            const devMails = []
            Swal.fire({
                title: "We need more info",
                icon: "warning",
                text: 'Next stage of this appliaction requires people with technical knowledge. Please, insert their mails here, splitting them with commas (,)',
                input: "text",
                preConfirm: (devsMails) => {
                    if (devsMails) {
                        devsMails.split(",")
                            .map(mail => mail.trim())
                            .forEach(mail => devMails.push(mail))
                        devMails.forEach(mail => {
                            if(!validateEmail(mail)) {
                                Swal.showValidationMessage(`${mail} is not a valid email`)
                                devMails.length = 0
                            } 
                        })
                    } else {
                        Swal.showValidationMessage("Please, add mails of such people, as you won't be able to change it later.")
                    }
                }
            }).then(result => {
                if (result.isConfirmed) {
                    doSetNextStage(devMails)
                }
            })
        } else {
            doSetNextStage([])
        }
    }

    const doSetNextStage = (devMails) => {
        withSwal({
            loadingTitle: "Setting next stage of Application",
            promise: () => applicationsAPI.nextStage(application.id, devMails),
            successFunction: () => reload(),
            successSwalTitle: "Next stage set successfully"
        })
    }

    const nextStageRequiresDevs = () => nextStageIsOneOf(["TECHNICAL_INTERVIEW", "TASK"], true)

    const stageRequiresMeeting = () => nextStageIsOneOf(["TECHNICAL_INTERVIEW", "HR_INTERVIEW"])

    const nextStageIsOneOf = (types, checkForNext) => {
        let indexOfNextStage = application?.stages?.findIndex(stage => stage.id === application.stage.id)
        if (checkForNext) indexOfNextStage += 1
        return types.includes(application?.stages[indexOfNextStage]?.type)
    }

    const getDisabled = () => {
        return application.status === "REJECTED" || application.status === "ACCEPTED"
    }

    const getRejectButtonStyle = () =>
        getDisabled() ? {} : {border: `1px solid ${theme.status.danger.main}`, color: theme.status.danger.main}

    const teleportToMO = () =>
        history.push(`/meeting/organizer/${application.id}`)

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
                                <Typography variant="h6" color="textSecondary">{application.offerName}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12}
                              style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div>
                                <Typography>{application.jobSeeker.user.mail}</Typography>
                            </div>
                            <div>
                                <Typography color="textSecondary">{processAPI._prepareDate(new Date(application.applicationDate))}</Typography>
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
                        {
                            isHR && stageRequiresMeeting() && !getDisabled() &&
                                <Grid item xs={4}><Button color="secondary" variant="outlined" onClick={teleportToMO}>Plan meeting</Button></Grid>
                        }
                        <Grid item xs={12}>
                            {/*  Notes about candidate in future  */}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        {
                            isHR &&
                            <Grid item xs={12} style={{display: "flex", justifyContent: "flex-end"}}>
                                <Button style={getRejectButtonStyle()} variant="outlined" onClick={rejectApplication} disabled={getDisabled()}>
                                    Reject Application
                                </Button>
                                <Box m={1}/>
                                <Button color="primary" variant="contained" onClick={nextStage} disabled={getDisabled()}>
                                    Next Stage
                                </Button>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <ApplicationTimeline stages={application.stages} currentStageId={application.stage.id}
                                                 status={application.status}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>)
    }

    return (
        <ListElementDetails cardContent={getCardContent()}/>
    )
}