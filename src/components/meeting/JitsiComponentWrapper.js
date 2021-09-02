import {JitsiComponent} from "e-stella-jitsi";
import {MeetingFab} from "./MeetingFab";
import {useState} from "react";
import {Whiteboard} from "e-stella-whiteboard";
import {TaskWrapper} from "../task/TaskWrapper";

export const JitsiWrapper = (props) => {

    const [jitsiHeight, setJitsiHeight] = useState('calc(100vh - 60px)')
    const [jitsiWidth, setJitsiWidth] = useState('100%')
    const [componentSeen, setComponentSeen] = useState(null)

    const addWhiteboard = () => {
        setJitsiWidth('20%')
        setJitsiHeight('calc(100vh - 60px)')
        setComponentSeen(
            <div style={{float: "left", width: '80%', height: 'calc(100vh-60px)'}}>
                <Whiteboard
                    client_id={process.env.REACT_APP_WHITEBOARD_KEY}
                    code={getWhiteboardCode()}
                />
            </div>
        )
    }

    const defaultView = () => {
        setJitsiHeight('calc(100vh-60px)')
        setJitsiWidth('100%')
        setComponentSeen(null)
    }

    const showTask = () => {
        setJitsiWidth('20%')
        setComponentSeen(
            <div style={{float: "left", width: '80%', height: 'calc(100vh-60px)'}}>
                <TaskWrapper id={16} submitLeftOffset={'25%'}/>
            </div>
        )
    }

    const getWhiteboardCode = () => {
        if (props.roomName.length < 15) return 'abcdefghijklmnopqrst'
        return props.roomName
    }

    return (
        <div>
            <MeetingFab onWhiteboard={addWhiteboard} onDefaultView={defaultView} onTask={showTask}/>
            <div style={{height: jitsiHeight, width: jitsiWidth, float: "left"}}>
                <JitsiComponent admin={props.admin} roomName={props.roomName} displayName={props.displayName}/>
            </div>
            {componentSeen}
        </div>
    )
}