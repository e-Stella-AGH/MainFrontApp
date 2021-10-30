import {useParams} from "react-router-dom";
import {useState} from "react";
import {TasksPassword} from "./TasksPassword";
import {TasksList} from "./crud/TasksList";
import {useDevPassword} from "../../utils/hooks/useDevPassword";
import {tasksApi} from "../../utils/apis/TasksApi";

export const TasksViewWrapper = ({ fetchTasks }) => {
    const {organizationId} = useParams()

    const [devPassword, setDevPassword] = useState("")
    const { set } = useDevPassword()

    const handleSubmit = (password) => {
        set(`${organizationId}:${password}`)
        setDevPassword(`${organizationId}:${password}`)
    }

    const handleAddTask = (task) => tasksApi.addTask(task, organizationId, devPassword)
    const handleDeleteTask = (taskId) => tasksApi.deleteTask(taskId, organizationId, devPassword)
    const onFetchFail = () => setDevPassword("")

    return !!devPassword ?
        <TasksList fetchTasks={(id) => fetchTasks(id, devPassword)}
                   id={organizationId}
                   onCreateTask={handleAddTask}
                   onDeleteTask={handleDeleteTask}
                   onFetchFail={onFetchFail}
        /> : <TasksPassword handleSubmit={handleSubmit}/>
}
