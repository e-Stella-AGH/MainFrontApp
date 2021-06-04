import {JitsiWrapper} from "./JitsiComponentWrapper";
import {MeetingDisplayNameForm} from "./MeetingDisplayNameForm";
import {useState} from "react";

export const MeetingDisplayName = (props) => {

    const [shouldDisplayForm, setShouldDisplayForm] = useState({
        shouldDisplay: true,
        name: ""
    })

    const getAdminDisplayer = () => {
        return shouldDisplayForm.shouldDisplay ? <MeetingDisplayNameForm onSubmit={onNameFormSubmit}/> :
            <JitsiWrapper admin={true} roomName={props.roomName} displayName={shouldDisplayForm.name}/>
    }

    const onNameFormSubmit = (name) => {
        setShouldDisplayForm({
            shouldDisplay: false,
            name: name
        })
    }

    if (props.dispalyName) {
        return <JitsiWrapper admin={false} roomName={props.roomName} displayName={props.dispalyName}/>
    } else {
        return getAdminDisplayer()
    }
}