import {JitsiWrapper} from "./JitsiComponentWrapper";
import {MeetingDisplayNameForm} from "./MeetingDisplayNameForm";
import {useState} from "react";
import {LoginForm} from '../../auth/login/LoginForm';
import {jwtUtils} from '../../../utils/jwt/jwtUtils';

export const MeetingDisplayName = ({ roomName, interviewId, companyId, interviewKind }) => {

    const [shouldDisplayForm, setShouldDisplayForm] = useState({
        shouldDisplay: true,
        name: ""
    })

    const getAdminDisplayer = () => {
        return shouldDisplayForm.shouldDisplay && !jwtUtils.getUser() ? getForm() :
            <JitsiWrapper admin={true} roomName={roomName} displayName={shouldDisplayForm.name} interviewId={interviewId} companyId={companyId} interviewKind={interviewKind}/>
    }

    const getForm = () => interviewKind === 'hr' ?
        <LoginForm reload={{setReload: (innerReload) => setShouldDisplayForm({...shouldDisplayForm, shouldDisplay: innerReload}), reload: true}} shouldRedirectIfLoggedIn={false} />
             : <MeetingDisplayNameForm onSubmit={onNameFormSubmit}/>

    const onNameFormSubmit = (name) => {
        setShouldDisplayForm({
            shouldDisplay: false,
            name: name
        })
    }

    return getAdminDisplayer()
}