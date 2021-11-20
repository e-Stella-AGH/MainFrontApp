import {codeCheckerLink} from "../../utils/apis/APILinks";
import {CodeEditor} from "e-stella-code-editor";
import React from "react";
import {useAbly} from "../../utils/hooks/useAbly";
import {tasksApi} from "../../utils/apis/tasksAPI";

const TaskWrapper = ({ toSolveTask = true, submitLeftOffset = 0, taskStageUUID,  task }) => {
    const { pub, sub, clientId } = useAbly(`codeChanged/${taskStageUUID}/${task.id}`)

    const fetchTasks = new Promise(resolve => resolve([task]))
    const outerMonacoWrapperStyle = toSolveTask ? null : { height: '60vh' }

    return <CodeEditor
        codeCheckerBaseLink={codeCheckerLink}
        fetchTasks={fetchTasks}
        solverId={taskStageUUID}
        taskStartedCallback={() => tasksApi.taskStarted(taskStageUUID, task)}
        absoluteOffset={{settings: { top: 0, right: 0 }, submit: {top: 0, left: submitLeftOffset}}}
        outerMonacoWrapperStyle={outerMonacoWrapperStyle}
        sharingCodeFunctions={{ pub, sub, id: clientId }}
    />
}

export default TaskWrapper