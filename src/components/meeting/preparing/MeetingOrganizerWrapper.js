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
    const [possibleHosts, setPossibleHosts] = useState(null)

    let redirectPath = "/"

    const type = paramType || propType

    useEffect(() => {
        if(type === "organizer") {
            interviewAPI.getNewestInterview(uuid)
                .then(data => {
                    console.log(data)
                    setOutsideValues({hosts: data?.hosts || [], guest: data?.application?.jobSeeker?.user?.mail || '', uuid: data?.id})
                    if (data?.application?.stage?.type === "HR_INTERVIEW") {
                        setPossibleHosts(data?.possibleHosts)
                    }
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

    const getStillFetching = () => type === "organizer" ? !!outsideValues : !!userData 

    return fetchError ? <Redirect to={redirectPath} /> : (
        getStillFetching() ? <MeetingOrganizer meetingOrganizerBaseLink={meetingOrganizerLink}
                                userData={userData}
                                outsideJwt={jwtUtils.getAuthToken()}
                                drawerStyle={{marginTop: `calc(${constants.navbar_height} + 1em)`}}
                                outsideMeetingValues={outsideValues}
                                allowedHostsMails={possibleHosts}
                                />: <CenteredCircularProgress size={80} />
    )
}