import {ListElementDetails} from "../commons/ListElementDetails";
import {CardContent, Grid} from "@material-ui/core";
import {ApplicationTimeline} from "./ApplicationTimeline";

export const ApplicationDetails = ({application, process}) => {

    console.log(application, process)

    const getCardContent = () => {
        return (<CardContent>
            <Grid container direction="row">
                <Grid item xs={12} md={6}>

                </Grid>
                <Grid item xs={12} md={6}>
                    <ApplicationTimeline stages={process.stages.map(item => item.type)} />
                </Grid>
            </Grid>
        </CardContent>)
    }

    return (
        <ListElementDetails cardContent={getCardContent()} />
    )
}