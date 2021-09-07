import {CodeEditor} from 'e-stella-code-editor'
import {tasksApi} from "../../utils/apis/TasksApi";
import {useParams} from "react-router-dom";
import {constants} from "../../utils/constants";

export const TaskWrapper = ({ id: propId, toSolveTask = true, submitLeftOffset = 0 }) => {

    let { id } = useParams()

    if(!id) id = propId

    const fetchTasks = toSolveTask ? () => tasksApi.getTask(id || NaN) : () => new Promise(_ => {})
    const outerMonacoWrapperStyle = toSolveTask ? null : { height: '60vh' }

    return (
        <div>
            <CodeEditor
                codeCheckerBaseLink={tasksApi.codeCheckerLink}
                fetchTasks={fetchTasks}
                absoluteOffset={{settings: { top: 3, right: 0 }, submit: {top: 3, left: submitLeftOffset}}}
                outerMonacoWrapperStyle={outerMonacoWrapperStyle}
             />
        </div>
    )
}