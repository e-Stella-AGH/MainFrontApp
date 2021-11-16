import {Button, Card, CardContent, Divider, IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import {useState} from "react";
import {GenericFileViewer} from "../../commons/GenericFileViewer";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {theme} from "../../../utils/theme";
import Swal from "sweetalert2";

export const Task = ({task, tasksOperations}) => {

    const [open, setOpen] = useState(false)
    const [menuAnchor, setMenuAnchor] = useState(null)

    const menuClose = () => {
        setMenuAnchor(null)
    }

    const onDelete = () => {
        let swal = new Swal({
            title: "Deleting selected task"
        })
        Swal.showLoading()
        tasksOperations['delete']()
            .finally(() =>
                swal.close()
            )
            .catch(() =>
                Swal.fire({
                    title: "Error",
                    text: "Error while deleting task",
                    icon: "error",
                    confirmButtonText: "OK"
                })
            )
    }

    return (
        <Card style={{padding: '1em'}}>
            <div style={{float: 'right'}}>
                <IconButton onClick={(event) => setMenuAnchor(event.currentTarget)}>
                    <MoreHorizIcon/>
                </IconButton>
            </div>
            <CardContent>
                <Typography variant="h5">Task: {task.id}</Typography>
                <Typography variant="subtitle1"
                            color="textSecondary">Deadline: {new Date(task.deadline).toLocaleString()}</Typography>
                <Typography variant="subtitle2" color="textSecondary">Time limit: {task.timeLimit}</Typography>
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
                <MenuItem onClick={onDelete} style={{color: theme.status.danger.main}}>Delete</MenuItem>
            </Menu>
        </Card>
    )
}