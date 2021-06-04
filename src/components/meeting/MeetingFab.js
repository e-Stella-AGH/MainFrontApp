import {Action, Fab} from "react-tiny-fab";
import AddIcon from '@material-ui/icons/Add';
import {colors} from "../../utils/colors";
import DashboardIcon from '@material-ui/icons/Dashboard';

export const MeetingFab = (props) => {
    return(
        <Fab
            mainButtonStyles={{backgroundColor: colors.navbar}}
            icon={<AddIcon />}
            event={'click'}
        >
            <Action
                text="Whiteboard"
                onClick={props.onWhiteboard}
            >
                <DashboardIcon />
            </Action>
        </Fab>
    )
}