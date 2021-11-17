import {codeCheckerLink} from "../../utils/apis/APILinks";
import {CodeEditor} from "e-stella-code-editor";
import React from "react";
import {useAbly} from "../../utils/hooks/useAbly";

const TaskWrapper = ({ id: propId, toSolveTask = true, submitLeftOffset = 0, fetchTasks: propFetchTasks }) => {

    let { taskStageUUID } = useParams()

    if(!taskStageUUID) taskStageUUID = propId

    const { pub, sub, clientId } = useAbly(`codeChanged/${taskStageUUID}`)

    const fetchTasks = !!propFetchTasks ? propFetchTasks : toSolveTask ? () => tasksApi.getTasks(taskStageUUID || NaN) : () => new Promise(_ => {})
    const outerMonacoWrapperStyle = toSolveTask ? null : { height: '60vh' }

    return <CodeEditor
        codeCheckerBaseLink={codeCheckerLink}
        fetchTasks={() => new Promise(resolve => resolve([task]))}
        solverId={taskStageUUID}
        absoluteOffset={{settings: { top: 0, right: 0 }, submit: {top: 0, left: submitLeftOffset}}}
        outerMonacoWrapperStyle={outerMonacoWrapperStyle}
        sharingCodeFunctions={{ pub, sub, id: clientId }}
    />
}

export default TaskWrapper