import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ComputerIcon from '@material-ui/icons/Computer';
import CancelIcon from '@material-ui/icons/Cancel';

export const ProcessStage = {
    APPLIED: {
        name: "Applied",
        description: "",
        icon: <DescriptionIcon />
    },
    HR_INTERVIEW: {
        name: "Hr Interview",
        description: "",
        icon: <AssignmentIndIcon />
    },
    TASK: {
        name: "Task",
        description: "",
        icon: <AssignmentTurnedInIcon />
    },
    QUIZ: {
        name: "Quiz",
        description: "",
        icon: <ContactSupportIcon />
    },
    TECHNICAL_INTERVIEW: {
        name: "Technical Interview",
        description: "",
        icon: <ComputerIcon />
    },
    ENDED: {
        name: "The end",
        description: "",
        icon: <CancelIcon />
    },
}