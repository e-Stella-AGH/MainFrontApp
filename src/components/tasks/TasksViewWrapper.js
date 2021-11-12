import {useState} from "react";
import {TasksList} from "./crud/TasksList";
import {useDevPassword} from "../../utils/hooks/useDevPassword";
import {tasksApi} from "../../utils/apis/TasksApi";
import Swal from "sweetalert2";

export const TasksViewWrapper = ({resetDevPassword, id}) => {
    const organizationId = id

    const [reload, setReload] = useState(false)

    const { getEncoded } = useDevPassword()

    const handleAddTask = (task) => tasksApi.addTask(task, organizationId, getEncoded())
    const handleDeleteTask = (taskId) => tasksApi.deleteTask(taskId, organizationId, getEncoded())

    const onUnauthFetch = () =>
        Swal.fire({
            title: "Error",
            text: "You cannot access this panel! Check your credentials!",
            icon: "error"
        }).then(() => {
            resetDevPassword()
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
                resetDevPassword()
            }
        })

    return <TasksList fetchTasks={(id) => tasksApi.getOrganizationTasks(id, getEncoded())}
       id={organizationId}
       reload={reload}
       setReload={setReload}
       onCreateTask={handleAddTask}
       onDeleteTask={handleDeleteTask}
       onFetchFailedByServer={onFetchFailedByServer}
       onUnauthFetch={onUnauthFetch}
    />
}
