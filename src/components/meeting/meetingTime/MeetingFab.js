import {Action, Fab} from "react-tiny-fab";
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {useTheme} from "@material-ui/core";

export const MeetingFab = ({ onDefaultView, onWhiteboard, onTask, shouldShow }) => {

    const theme = useTheme()

    const defaultViewAction = (<Action
                                    text="Default View"
                                    onClick={onDefaultView}
                                >
                                    <VoiceChatIcon />
                                </Action>)

    const whiteboardAction = (<Action
                                    text="Whiteboard"
                                    onClick={onWhiteboard}
                                >
                                    <DashboardIcon />
                                </Action>)

    const taskAction = (<Action
                            text="Task"
                            onClick={onTask}
                        >
                            <AssignmentIndIcon />
                        </Action>)
    
    const map = {
        'task': taskAction,
        'whiteboard': whiteboardAction,
        'default': defaultViewAction
    }

    const getActionsToDisplay = () => shouldShow.filter(key => key in map).map(key => map[key])

    return(
        <Fab
            mainButtonStyles={{backgroundColor: theme.palette.primary.dark}}
            icon={<AddIcon />}
            event={'click'}
        >
            {getActionsToDisplay()}
        </Fab>
    )
}