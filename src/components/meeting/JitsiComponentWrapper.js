import {JitsiComponent} from "e-stella-jitsi";

export const JitsiWrapper = (props) => {
    return (
        <div style={{height: 'calc(100vh - 60px)'}}>
            <JitsiComponent admin={props.admin} roomName={props.roomName} displayName={props.displayName} />
        </div>
    )
}