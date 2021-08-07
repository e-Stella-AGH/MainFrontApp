import {ListElementDetails} from "../commons/ListElementDetails";
import {Box, Button, CardContent, Divider, Grid, Typography} from "@material-ui/core";
import {ApplicationTimeline} from "./ApplicationTimeline";
import {FileViewerWrapper} from "./FileViewerWrapper";

export const ApplicationDetails = ({application, process}) => {

    const getSeekerFiles = () => {
        return application.seekerFiles
            .map((file, idx) => (
                <Grid item key={`${idx}`} xs={12} md={6}>
                    <FileViewerWrapper undecodedFile={file}/>
                </Grid>))
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
                                <Typography variant="h6" color="textSecondary">{process.offer.name}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12}
                              style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div>
                                <Typography>{application.jobSeeker.user.mail}</Typography>
                            </div>
                            <div>
                                {/*TODO: After merging ES-188 format date with processAPI._prepareDate()*/}
                                <Typography color="textSecondary">{application.applicationDate}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12}><Divider/></Grid>
                        <Grid item xs={12}>
                            {
                                application.seekerFiles.length === 0 ?
                                    <Typography>Candidate didn't supply any files.</Typography> :
                                    <Grid container direction="row" spacing={4}>
                                        {getSeekerFiles()}
                                    </Grid>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            {/*  Notes about candidate in future  */}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12} style={{display: "flex", justifyContent: "flex-end"}}>
                            <Button color="secondary" variant="outlined">
                                Reject Application
                            </Button>
                            <Box m={1}/>
                            <Button color="primary" variant="contained">
                                Next Stage
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <ApplicationTimeline stages={process.stages} currentStageId={application.stage.id}
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