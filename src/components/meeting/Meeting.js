import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {interviewAPI} from "../../utils/apis/InterviewAPI";
import {MeetingDisplayName} from "./MeetingDisplayName";
import {JitsiWrapper} from "./JitsiComponentWrapper";

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
            {name === null ?
                <MeetingDisplayName roomName={`${interviewId}`}/>
                : <JitsiWrapper admin={false} roomName={`${interviewId}`} displayName={name}/>
            }
        </div>
    )
}