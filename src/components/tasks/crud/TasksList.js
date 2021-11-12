import {useEffect, useState} from "react";
import {Task} from "./Task";
import {Button, Drawer, List, ListItem} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";
import {constants} from "../../../utils/constants";
import {createTask} from "./createTask";
import {tasksApi} from "../../../utils/apis/tasksAPI";
import { useParams } from 'react-router-dom';
import { useDevPassword } from "../../../utils/hooks/useDevPassword";

export const TasksList = ({ fetchTasks, organizationId }) => {

    const [reload, setReload] = useState(false)

    const {getEncoded} = useDevPassword()

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetchTasks(organizationId, getEncoded())
            .then(data => {
                setTasks(data)
            })
    }, [fetchTasks, organizationId, reload])

    const addTask = () => {
        createTask(reload, setReload, { password: getEncoded(), organizationId })
    }

    const deleteTask = (id) => {
        tasksApi.updateTasks(tasks.filter(task => task.id !== id))
            .then(_ => setReload(!reload))
    }

    return (
        <div>
            <div style={{display: 'flex', flexFlow: 'row wrap', gap: '2em', marginRight: '5%'}}>
                {tasks.map(task => <Task key={task?.id} task={task} tasksOperations={[]}/>)}
            </div>
            <Drawer
                variant="permanent"
                style={{display: "flex", alignItems: "center"}}
                anchor="right"
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