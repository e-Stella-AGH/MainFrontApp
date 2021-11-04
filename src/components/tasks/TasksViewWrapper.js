import {useParams} from "react-router-dom";
import {useState} from "react";
import {TasksPassword} from "./TasksPassword";
import {TasksList} from "./crud/TasksList";
import {useDevPassword} from "../../utils/hooks/useDevPassword";
import {tasksApi} from "../../utils/apis/TasksApi";
import Swal from "sweetalert2";

export const TasksViewWrapper = ({ fetchTasks }) => {
    const {organizationId} = useParams()

    const [reload, setReload] = useState(false)

    const { set, get } = useDevPassword()
    const [devPassword, setDevPassword] = useState(get() || "")

    const handleSubmit = (password) => {
        set(`${organizationId}:${password}`)
        setDevPassword(`${organizationId}:${password}`)
    }

    const handleAddTask = (task) => tasksApi.addTask(task, organizationId, devPassword)
    const handleDeleteTask = (taskId) => tasksApi.deleteTask(taskId, organizationId, devPassword)

    const onUnauthFetch = () =>
        Swal.fire({
            title: "Error",
            text: "You cannot access this panel! Check your credentials!",
            icon: "error"
        }).then(() => {
            set("")
            setDevPassword("")
        })
    const onFetchFailedByServer = () =>
        Swal.fire({
            title: "Error",
            text: "We encountered some problems while fetching tasks for you! Do you want to try again?",
            icon: "error",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No, take me back!"
        }).then(result => {
            if (result.isConfirmed) {
                setReload(r => !r)
            } else {
                set("")
                setDevPassword("")
            }
        })

    return !!devPassword ?
        <TasksList fetchTasks={(id) => fetchTasks(id, devPassword)}
                   id={organizationId}
                   reload={reload}
                   setReload={setReload}
                   onCreateTask={handleAddTask}
                   onDeleteTask={handleDeleteTask}
                   onFetchFailedByServer={onFetchFailedByServer}
                   onUnauthFetch={onUnauthFetch}
        /> : <TasksPassword handleSubmit={handleSubmit}/>
}
