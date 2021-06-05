import {Action, Fab} from "react-tiny-fab";
import AddIcon from '@material-ui/icons/Add';
import {colors} from "../../utils/colors";
import DashboardIcon from '@material-ui/icons/Dashboard';
import VoiceChatIcon from '@material-ui/icons/VoiceChat';

export const MeetingFab = (props) => {
    return(
        <Fab
            mainButtonStyles={{backgroundColor: colors.navbar}}
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