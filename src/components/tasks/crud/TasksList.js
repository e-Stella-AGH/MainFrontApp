import React, {useEffect, useState} from "react";
import {Task} from "./Task";
import {Button, Drawer, List, ListItem} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";
import {constants} from "../../../utils/constants";
import {createTask} from "./createTask";
import CenteredCircularProgress from "../../commons/CenteredCircularProgress";

export const TasksList = ({
                              fetchTasks,
                              reload,
                              setReload,
                              onFetchFailedByServer,
                              onUnauthFetch,
                              id,
                              onCreateTask,
                              onDeleteTask
                          }) => {

    const [tasks, setTasks] = useState([])
    const [fetching, setFetching] = useState(true)

    const addTask = () => createTask(onCreateTask, setReload)

    useEffect(() => {
        fetchTasks(id)
            .then(data => {
                setTasks(data)
                setFetching(false)
            })
            .catch(httpError => {
                if (400 <= httpError.code && httpError.code < 500)
                    onUnauthFetch(httpError)
                else
                    onFetchFailedByServer()
            })
    }, [reload, fetchTasks, id, setTasks, setFetching, onUnauthFetch, onFetchFailedByServer])

    const deleteTask = (taskId) => onDeleteTask(taskId).then(resp => {
        setReload(r => !r)
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