import {MeetingOrganizer} from "e-stella-meeting-organizer";
import {meetingOrganizerLink} from "../../../utils/apis/APILinks";
import {Redirect, useParams} from "react-router-dom";
import {jwtUtils} from "../../../utils/jwt/jwtUtils";
import {constants} from "../../../utils/constants";
import React, {useEffect, useState} from "react";
import {interviewAPI} from "../../../utils/apis/InterviewAPI";
import Swal from "sweetalert2";
import CenteredCircularProgress from "../../commons/CenteredCircularProgress";

export const MeetingOrganizerWrapper = ({ type : propType }) => {

    const {type : paramType, uuid} = useParams()
    const [meetingUUID, setMeetingUUID] = useState("")
    const [fetchError, setFetchError] = useState(false)

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
                    setMeetingUUID(data?.meetingUUID)
                })
                .catch(() =>
                    Swal.fire({
                        title: "Error",
                        text: "We couldn't find an interview for this application! You will be redirected to home page",
                        icon: "error"
                    }).then(() => {
                        setFetchError(true)
                    })
                )
        }
    }, [type, uuid])

    return fetchError ? <Redirect to="/" /> : (
        meetingUUID === "" ? <CenteredCircularProgress size={80} /> :
            <MeetingOrganizer meetingOrganizerBaseLink={meetingOrganizerLink}
                              userData={userData}
                              outsideJwt={jwtUtils.getAuthToken()}
                              outerFunctions={{ 'onPickSlot': onPickSlotByJobSeeker }}
                              drawerStyle={{marginTop: `calc(${constants.navbar_height} + 1em)`}}
                              outsideMeetingUUID={meetingUUID} />
    )
}