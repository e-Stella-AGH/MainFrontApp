import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {interviewAPI} from "../../utils/InterviewAPI";
import {MeetingDisplayName} from "./MeetingDisplayName";
import {JitsiWrapper} from "./JitsiComponentWrapper";

export const Meeting = () => {
    let { interviewId, companyId } = useParams()
    const [name, setName] = useState(null)

    console.log(name)

    useEffect(() => {
        if(companyId === undefined) {
            interviewAPI.getJobSeekerNameByInterviewId(interviewId)
                .then(data => setName(data))
        }
    }, [companyId, interviewId])

    return (
        <div>
            {name === null ?
                <MeetingDisplayName roomName={`${interviewId}`}/>
                : <JitsiWrapper admin={false} roomName={`${interviewId}`} displayName={name}/>
            }
        </div>
    )
}