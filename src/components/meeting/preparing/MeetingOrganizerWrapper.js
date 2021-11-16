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
    const [outsideValues, setOutsideValues] = useState(null)
    const [fetchError, setFetchError] = useState(false)
    const [userData, setUserData] = useState(null)

    let redirectPath = "/"

    const type = paramType || propType

    const onPickSlotByJobSeeker = userData?.userType === "job_seeker" ? (slot) => console.log(slot) : () => {}

    useEffect(() => {
        if(type === "organizer") {
            interviewAPI.getNewestInterview(uuid)
                .then(data => {
                    setOutsideValues({hosts: data?.hosts || [], guest: data?.application?.jobSeeker?.user?.mail || '', uuid: data?.id})
                })
                .catch(() =>
                    Swal.fire({
                        title: "Error",
                        text: "We couldn't find the interview data for this application! You will be redirected to home page",
                        icon: "error"
                    }).then(() => {
                        setFetchError(true)
                    })
                )
        } else {
            setUserData({uuid, userType: type})
        }
    }, [type, uuid])

    console.log(outsideValues)

    return fetchError ? <Redirect to={redirectPath} /> : (
        !!outsideValues || !!userData ? <MeetingOrganizer meetingOrganizerBaseLink={meetingOrganizerLink}
                                userData={userData}
                                outsideJwt={jwtUtils.getAuthToken()}
                                outerFunctions={{ 'onPickSlot': onPickSlotByJobSeeker }}
                                drawerStyle={{marginTop: `calc(${constants.navbar_height} + 1em)`}}
                                outsideMeetingValues={outsideValues} />: <CenteredCircularProgress size={80} />
    )
}