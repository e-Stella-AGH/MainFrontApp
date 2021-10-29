import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator
} from "@material-ui/lab";
import {ProcessStage} from "../../utils/procesStages";
import {makeStyles, Paper, Typography, useTheme} from "@material-ui/core";
import {applicationStatus} from "../../utils/Enums";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

export const ApplicationTimeline = ({stages, currentStageId, status}) => {

    const classes = useStyles()
    const theme = useTheme()

    let isBeforeCurrent = true

    const getTimelineContent = (stage) => (
        <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
                {stage.name}
            </Typography>
            <Typography>{stage.description}</Typography>
        </Paper>
    )

    const getDotColor = stageId => {
        if (stageId === currentStageId) {
            isBeforeCurrent = false
            return theme.palette.primary.main
        }
        if (isBeforeCurrent) return theme.status.success.main
        else if (status === applicationStatus.REJECTED.toUpperCase()) {
            return theme.status.danger.main
        } else if (status === applicationStatus.IN_PROGRESS.toUpperCase().replace(" ", "_")) {
            return "grey"
        } else return "grey"
    }

    const getTimelineItem = (key, displayConnector) => {
        const parts = key.split(".")
        const stage = ProcessStage[parts[0]]
        const stageId = Number(parts[1])
        return (
            <TimelineItem key={key}>
                <TimelineSeparator>
                    <TimelineDot style={{backgroundColor: getDotColor(stageId)}}>
                        {stage.icon}
                    </TimelineDot>
                    {displayConnector ? <TimelineConnector /> : null}
                </TimelineSeparator>
                <TimelineContent>{getTimelineContent(stage)}</TimelineContent>
            </TimelineItem>
        )
    }

    const getTimelineItems = () => {
        return stages
            .map((item, idx) => {
            return getTimelineItem(`${item.type}.${item.id}`, idx !== stages.length - 1)
        })
    }

    return <Timeline align="alternate">
        {getTimelineItems()}
    </Timeline>
}