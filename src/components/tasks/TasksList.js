import {useEffect, useState} from "react";
import {Task} from "./Task";
import {Button, Drawer, List, ListItem} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";
import {constants} from "../../utils/constants";
import {createTask} from "./createTask";

export const TasksList = ({ fetchTasks }) => {

    const [tasks, setTasks] = useState([])
    console.log(tasks)

    const addTask = () => {
        createTask()
    }

    useEffect(() => {
        fetchTasks()
            .then(data => setTasks(data))
    }, [fetchTasks])

    return (
        <div>
            <div style={{display: 'flex', flexFlow: 'row wrap', gap: '1em', marginLeft: '20%'}}>
                {tasks.map(task => <Task key={task?.id} task={task}/>)}
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