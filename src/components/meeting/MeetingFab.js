import {Action, Fab} from "react-tiny-fab";
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';
import {useTheme} from "@material-ui/core";

export const MeetingFab = (props) => {

    const theme = useTheme()

    return(
        <Fab
            mainButtonStyles={{backgroundColor: theme.palette.primary.dark}}
            icon={<AddIcon />}
            event={'click'}
        >
            <Action
                text="Default View"
                onClick={props.onDefaultView}
            >
                <VoiceChatIcon />
            </Action>
            <Action
                text="Whiteboard"
                onClick={props.onWhiteboard}
            >
                <DashboardIcon />
            </Action>
        </Fab>
    )
}