import {CodeEditor} from 'e-stella-code-editor'
import {tasksApi} from "../../utils/apis/tasksAPI";
import {useParams} from "react-router-dom";
import {codeCheckerLink} from "../../utils/apis/APILinks";
import {useAbly} from "../../utils/hooks/useAbly";

export const TaskWrapper = ({ id: propId, toSolveTask = true, submitLeftOffset = 0, fetchTasks: propFetchTasks }) => {

    let { taskStageUUID } = useParams()

    if(!taskStageUUID) taskStageUUID = propId

    const { pub, sub, clientId } = useAbly(`codeChanged/${taskStageUUID}`)

    const fetchTasks = !!propFetchTasks ? propFetchTasks : toSolveTask ? () => tasksApi.getTasks(taskStageUUID || NaN) : () => new Promise(_ => {})
    const outerMonacoWrapperStyle = toSolveTask ? null : { height: '60vh' }

    return (
        <div>
            <CodeEditor
                codeCheckerBaseLink={codeCheckerLink}
                fetchTasks={fetchTasks}
                solverId={taskStageUUID}
                absoluteOffset={{settings: { top: 3, right: 0 }, submit: {top: 3, left: submitLeftOffset}}}
                outerMonacoWrapperStyle={outerMonacoWrapperStyle}
                sharingCodeFunctions={{ pub, sub, id: clientId }}
             />
        </div>
    )
}