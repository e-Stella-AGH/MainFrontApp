import {JitsiWrapper} from "./JitsiComponentWrapper";
import {MeetingDisplayNameForm} from "./MeetingDisplayNameForm";
import {useState} from "react";

export const MeetingDisplayName = ({ roomName, interviewId, companyId }) => {

    const [shouldDisplayForm, setShouldDisplayForm] = useState({
        shouldDisplay: true,
        name: ""
    })

    const getAdminDisplayer = () => {
        return shouldDisplayForm.shouldDisplay ? <MeetingDisplayNameForm onSubmit={onNameFormSubmit}/> :
            <JitsiWrapper admin={true} roomName={roomName} displayName={shouldDisplayForm.name} interviewId={interviewId} companyId={companyId}/>
    }

    const onNameFormSubmit = (name) => {
        setShouldDisplayForm({
            shouldDisplay: false,
            name: name
        })
    }

    return getAdminDisplayer()
}