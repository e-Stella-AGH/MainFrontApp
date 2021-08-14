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
import {colors} from "../../utils/colors";

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
            return colors['main']
        }
        if (isBeforeCurrent) return colors['success']
        else if (status === "REJECTED") {
            return colors.error
        } else if (status === "ACCEPTED") {
            return colors["main-light"]
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