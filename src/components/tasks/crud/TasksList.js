import React, {useEffect, useState} from "react";
import {Task} from "./Task";
import {Button, Drawer, List, ListItem} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";
import {constants} from "../../../utils/constants";
import {createTask} from "./createTask";
import CenteredCircularProgress from "../../commons/CenteredCircularProgress";
import Swal from "sweetalert2";

export const TasksList = ({ fetchTasks, onFetchFail, id, onCreateTask, onDeleteTask }) => {

    const [tasks, setTasks] = useState([])
    const [reload, setReload] = useState(false)
    const [fetching, setFetching] = useState(true)

    const addTask = () => createTask(onCreateTask, reload, setReload)

    useEffect(() => {
        fetchTasks(id)
            .then(data => {
                setTasks(data)
                setFetching(false)
            })
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "You cannot access this panel! Check your credentials!",
                    icon: "error"
                }).then(() => onFetchFail())
            })
    }, [fetchTasks, id, reload, setTasks, setFetching, onFetchFail])

    const deleteTask = (taskId) => onDeleteTask(taskId).then(resp => {
        setReload(!reload)
        return resp
    })

    return fetching ? <CenteredCircularProgress /> : <div>
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
}