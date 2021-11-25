import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {interviewAPI} from "../../../utils/apis/InterviewAPI";
import {MeetingDisplayName} from "./MeetingDisplayName";
import {JitsiWrapper} from "./JitsiComponentWrapper";
import {CircularProgress} from "@material-ui/core";

export const Meeting = () => {
    let { interviewKind, interviewId, companyId } = useParams()
    const [name, setName] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        if(companyId === undefined) {
            interviewAPI.getJobSeekerNameByInterviewId(interviewId)
                .then(data => {
                    setName(`${data?.firstName || ""} ${data?.lastName || ""}`)
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
                <Fetched name={name} interviewId={interviewId} companyId={companyId} interviewKind={interviewKind} />
            }
        </div>
    )
}

const Fetched = ({ name, interviewId, companyId, interviewKind }) => {
    return (
        name === null ?
            <MeetingDisplayName roomName={`${interviewId}`} interviewId={interviewId} companyId={companyId} interviewKind={interviewKind}/>
            : <JitsiWrapper admin={false} roomName={`${interviewId}`} displayName={name ? name : "John Doe"} interviewId={interviewId} interviewKind={interviewKind}/>
    )
}