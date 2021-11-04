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
    const [outsideValues, setOutsideValues] = useState(null)

    const type = paramType || propType

    const userData = {
        userType: type,
        uuid: uuid
    }

    const onPickSlotByJobSeeker = userData.userType === "job_seeker" ? (slot) => console.log(slot) : () => {}

    useEffect(() => {
        if(userData.userType === "organizer") {
            interviewAPI.getNewestInterview(uuid)
                .then(data => {
                    setOutsideValues({hosts: data?.hosts || [], guest: data?.application?.jobSeeker?.user?.mail || '', uuid: data?.id})
                })
        }
    }, [type, uuid])

    return !!outsideValues ? <MeetingOrganizer meetingOrganizerBaseLink={meetingOrganizerLink}
                                userData={userData}
                                outsideJwt={jwtUtils.getAuthToken()}
                                outerFunctions={{ 'onPickSlot': onPickSlotByJobSeeker }}
                                drawerStyle={{marginTop: `calc(${constants.navbar_height} + 1em)`}}
                                outsideMeetingValues={outsideValues} />: <CircularProgress size={80} />
}