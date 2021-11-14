import {Button, Card, CardContent, Divider, IconButton, Menu, Typography} from "@material-ui/core";
import {useState} from "react";
import {GenericFileViewer} from "../../commons/GenericFileViewer";
import {getFirstLineFromTaskDescription} from "../tasksUtils";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export const Task = ({task, tasksOperations, shouldDisplayMenu}) => {

    const [open, setOpen] = useState(false)
    const [menuAnchor, setMenuAnchor] = useState(null)

    const menuClose = () => {
        setMenuAnchor(null)
    }

    return (
        <Card style={{padding: '1em'}}>
        {   shouldDisplayMenu &&
            <div style={{float: 'right'}}>
                <IconButton onClick={(event) => setMenuAnchor(event.currentTarget)}>
                    <MoreHorizIcon/>
                </IconButton>
            </div>
        }
            <CardContent>
                <Typography variant="h5">{ getFirstLineFromTaskDescription(task.descriptionBase64) }</Typography>
                <Typography variant="subtitle" color="textSecondary">Time limit: {task.timeLimit}</Typography>
                <Divider style={{marginTop: '1em', marginBottom: '1em'}}/>
                <Button color="primary" variant="outlined" onClick={() => setOpen(true)}>Show Description</Button>
                <GenericFileViewer file={{fileBase64: task.descriptionBase64, fileName: task.descriptionFileName}}
                                   open={open} handleClose={() => setOpen(false)}/>
            </CardContent>

            <Menu
                anchorEl={menuAnchor}
                keepMounted
                open={!!menuAnchor}
                onClose={menuClose}
            >
                {tasksOperations.map(taskOperation => <Button onClick={taskOperation.action}>{taskOperation.title}</Button>)}
            </Menu>
        </Card>
    )
}