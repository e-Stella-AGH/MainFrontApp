import {useEffect, useState} from "react";
import {Task} from "./Task";
import {Button, Drawer, List, ListItem} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";
import {constants} from "../../../utils/constants";
import {createTask} from "./createTask";
import {tasksApi} from "../../../utils/apis/TasksApi";
import {useDevPassword} from "../../../utils/hooks/useDevPassword";

export const TasksList = ({ fetchTasks, id }) => {

    const [tasks, setTasks] = useState([])
    const [reload, setReload] = useState(false)
    const {get} = useDevPassword()

    const addTask = () => {
        createTask(tasks, reload, setReload, get())
    }

    useEffect(() => {
        fetchTasks(id)
            .then(data => setTasks(data))
    }, [fetchTasks, id, reload])

    const deleteTask = (id) => {
        tasksApi.updateTasks(tasks.filter(task => task.id !== id))
            .then(_ => setReload(!reload))
    }

    return (
        <div>
            <div style={{display: 'flex', flexFlow: 'row wrap', gap: '2em', marginLeft: '20%'}}>
                {tasks.map(task => <Task key={task?.id} task={task} tasksOperations={{ 'delete': () => deleteTask(task?.id) }}/>)}
            </div>
            <Drawer
                variant="permanent"
                style={{display: "flex", alignItems: "center"}}
            >
                <List style={{marginTop: `calc(${constants.navbar_height} + 1em)`}}>
                    <ListItem>
                        <Button onClick={addTask}>
                            <AddCircleOutline fontSize="large" color="action"/>
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}