import {MeetingOrganizer} from "e-stella-meeting-organizer";
import {meetingOrganizerLink} from "../../../utils/apis/APILinks";
import {useParams} from "react-router-dom";
import {jwtUtils} from "../../../utils/jwt/jwtUtils";
import {constants} from "../../../utils/constants";

export const MeetingOrganizerWrapper = ({ type : propType }) => {

    const {type : paramType, uuid} = useParams()

    const type = paramType || propType

    const userData = {
        userType: type,
        uuid: uuid
    }

    const onPickSlotByJobSeeker = userData.userType === "job_seeker" ? (slot) => console.log(slot) : () => {}

    return <MeetingOrganizer meetingOrganizerBaseLink={meetingOrganizerLink}
                             userData={userData}
                             outsideJwt={jwtUtils.getAuthToken()}
                             outerFunctions={{ 'onPickSlot': onPickSlotByJobSeeker }}
                             drawerStyle={{marginTop: `calc(${constants.navbar_height} + 1em)`}}/>
}