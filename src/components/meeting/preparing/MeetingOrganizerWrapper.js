import {MeetingOrganizer} from "e-stella-meeting-organizer";
import {meetingOrganizerLink} from "../../../utils/apis/APILinks";
import {useParams} from "react-router-dom";
import {jwtUtils} from "../../../utils/jwt/jwtUtils";
import {constants} from "../../../utils/constants";
import {useEffect, useState} from "react";
import {interviewAPI} from "../../../utils/apis/InterviewAPI";
import { CircularProgress } from '@material-ui/core';

export const MeetingOrganizerWrapper = ({ type : propType }) => {

    const {type : paramType, uuid} = useParams()
    const [meetingUUID, setMeetingUUID] = useState("")

    const type = paramType || propType

    const userData = {
        userType: type,
        uuid: uuid
    }

    const onPickSlotByJobSeeker = userData.userType === "job_seeker" ? (slot) => console.log(slot) : () => {}

    useEffect(() => {
        if(userData.userType === "organizer") {
            interviewAPI.getNewestInterviewId(uuid)
                .then(data => setMeetingUUID(data.uuid))
        }
    }, [type, uuid])

    return meetingUUID ? <MeetingOrganizer meetingOrganizerBaseLink={meetingOrganizerLink}
                             userData={userData}
                             outsideJwt={jwtUtils.getAuthToken()}
                             outerFunctions={{ 'onPickSlot': onPickSlotByJobSeeker }}
                             drawerStyle={{marginTop: `calc(${constants.navbar_height} + 1em)`}}
                             outsideMeetingUUID={meetingUUID} /> : <CircularProgress size={80} />
}