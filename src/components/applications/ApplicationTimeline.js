import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator
} from "@material-ui/lab";
import {ProcessStage} from "../../utils/procesStages";
import {makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

export const ApplicationTimeline = ({stages}) => {

    console.log(stages)

    const classes = useStyles()

    const getTimelineContent = (stage) => (
        <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
                {stage.name}
            </Typography>
            <Typography>{stage.description}</Typography>
        </Paper>
    )

    const getTimelineItem = (key, displayConnector) => {
        const stage = ProcessStage[key.split(".")[0]]
        return (
            <TimelineItem key={key}>
                <TimelineSeparator>
                    <TimelineDot>
                        {stage.icon}
                    </TimelineDot>
                    {displayConnector ? <TimelineConnector /> : null}
                </TimelineSeparator>
                <TimelineContent>{getTimelineContent(stage)}</TimelineContent>
            </TimelineItem>
        )
    }

    const getTimelineItems = () => {
        return stages.map((item, idx) => {
            return getTimelineItem(`${item}.${idx}`, idx !== stages.length - 1)
        })
    }

    return <Timeline align="alternate">
        {getTimelineItems()}
    </Timeline>
}