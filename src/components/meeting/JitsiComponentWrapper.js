import {JitsiComponent} from "e-stella-jitsi";
import {MeetingFab} from "./MeetingFab";

export const JitsiWrapper = (props) => {

    const addWhiteboard = () => {
        alert("added whiteboard")
    }


    return (
        <div style={{height: 'calc(100vh - 60px)'}}>
            { props.admin ?
                <MeetingFab onWhiteboard={addWhiteboard} /> : null }
            <JitsiComponent admin={props.admin} roomName={props.roomName} displayName={props.displayName} />
        </div>
    )
}