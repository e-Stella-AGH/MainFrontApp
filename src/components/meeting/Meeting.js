import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {interviewAPI} from "../../utils/apis/InterviewAPI";
import {MeetingDisplayName} from "./MeetingDisplayName";
import {JitsiWrapper} from "./JitsiComponentWrapper";
import {CircularProgress} from "@material-ui/core";

export const Meeting = () => {
    let { interviewId, companyId } = useParams()
    const [name, setName] = useState(null)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        if(companyId === undefined) {
            interviewAPI.getJobSeekerNameByInterviewId(interviewId)
                .then(data => {
                    setName(data?.name)
                    setFetching(false)
                })
        } else {
            setFetching(false)
        }
    }, [companyId, interviewId])

    return (
        <div>
            {
                fetching ? <CircularProgress /> :
                name === null ?
                <MeetingDisplayName roomName={`${interviewId}`}/>
                : <JitsiWrapper admin={false} roomName={`${interviewId}`} displayName={name ? name : "John Doe"}/>
            }
        </div>
    )
}