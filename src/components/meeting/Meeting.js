import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {interviewAPI} from "../../utils/InterviewAPI";
import {MeetingDisplayName} from "./MeetingDisplayName";

export const Meeting = () => {
    let { interviewId, companyId } = useParams()
    const [name, setName] = useState(null)

    useEffect(() => {
        if(companyId === undefined) {
            interviewAPI.getJobSeekerNameByInterviewId(interviewId)
                .then(data => setName(data))
        }
    }, [companyId, interviewId])

    return (
        <div>
            <MeetingDisplayName dispalyName={name} roomName={`${interviewId}${companyId}`}/>
        </div>
    )
}