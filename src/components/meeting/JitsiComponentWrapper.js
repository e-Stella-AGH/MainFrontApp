import {JitsiComponent} from "e-stella-jitsi";
import {MeetingFab} from "./MeetingFab";
import {useState} from "react";
import {Whiteboard} from "e-stella-whiteboard";

export const JitsiWrapper = (props) => {

    const [jitsiHeight, setJitsiHeight] = useState('calc(100vh - 60px)')
    const [jitsiWidth, setJitsiWidth] = useState('100%')
    const [whiteboardIsSeen, setWhiteboardIsSeen] = useState(false)

    const addWhiteboard = () => {
        setJitsiWidth('20%')
        setJitsiHeight('calc(100vh - 60px)')
        setWhiteboardIsSeen(true)
    }

    const defaultView = () => {
        setJitsiHeight('calc(100vh-60px)')
        setJitsiWidth('100%')
        setWhiteboardIsSeen(false)
    }

    const getWhiteboardCode = () => {
        if(props.roomName.length < 15) return 'abcdefghijklmnopqrst'
        return props.roomName
    }

    return (
        <div>
            <MeetingFab onWhiteboard={addWhiteboard} onDefaultView={defaultView} />
            <div style={{height: jitsiHeight, width: jitsiWidth, float: "left"}}>
                <JitsiComponent admin={props.admin} roomName={props.roomName} displayName={props.displayName} />
            </div>
            { whiteboardIsSeen ? <div style={{float: "left", width: 'calc(80%)', height: 'calc(100vh-60px)'}}><Whiteboard client_id={'ab072386034be36d086179b113d9fb57'} code={getWhiteboardCode()} /></div>: null }
        </div>
    )
}