import {useParams} from "react-router-dom";
import {useState} from "react";
import {TasksPassword} from "./TasksPassword";
import {TasksList} from "./crud/TasksList";
import {useDevPassword} from "../../utils/hooks/useDevPassword";

export const TasksViewWrapper = ({ fetchTasks }) => {
    const {organizationId} = useParams()

    const [password, setPassword] = useState("")
    const { set } = useDevPassword()

    const handleSubmit = (password) => {
        set(`${organizationId}.${password}`)
        setPassword(password)
    }

    return !!password ? <TasksList fetchTasks={fetchTasks} id={organizationId}/> : <TasksPassword handleSubmit={handleSubmit}/>
}
