import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {interviewAPI} from "../../utils/apis/InterviewAPI";
import {MeetingDisplayName} from "./MeetingDisplayName";
import {JitsiWrapper} from "./JitsiComponentWrapper";
import {CircularProgress} from "@material-ui/core";

export const Meeting = () => {
    let { interviewId, companyId } = useParams()
    const [name, setName] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        if(companyId === undefined) {
            interviewAPI.getJobSeekerNameByInterviewId(interviewId)
                .then(data => {
                    setName(data?.name)
                    setIsFetching(false)
                })
        } else {
            setIsFetching(false)
        }
    }, [companyId, interviewId])

    return (
        <div>
            {
                isFetching ? <CircularProgress /> :
                name === null ?
                <MeetingDisplayName roomName={`${interviewId}`}/>
                : <JitsiWrapper admin={false} roomName={`${interviewId}`} displayName={name ? name : "John Doe"}/>
            }
        </div>
    )
}