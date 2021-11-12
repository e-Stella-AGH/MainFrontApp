//This file should be merged with NotesDrawer from ES-231
import {useState} from 'react'
import { Drawer, List, ListItem, Button } from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CloseIcon from '@material-ui/icons/Close';
import {constants} from "../../utils/constants";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { TasksMenu } from './TasksMenu'

const drawerWidth = 600;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  }
}));


export const TasksDrawer = ({ tasks, key_uuid, uuid, reload, setReload }) => {

    const classes = useStyles()
    const theme = useTheme()
    const [isOpen, setIsOpen] = useState(false)

    const handleTaskClick = () => {
        setIsOpen(true)
    }

    const closeTask = () => {
        setIsOpen(false)
    }

    const closedView = (<List style={{marginTop: `calc(${constants.navbar_height} + 1em)`}}>
                            <ListItem>
                                <Button onClick={handleTaskClick}>
                                    <NoteAddIcon fontSize="large" color="action"/>
                                </Button>
                            </ListItem>
                        </List>)

    return (
        <div>
            {open && (
                <Button onClick={closeTask} style={{position:'absolute', top: '5em', left: '20px', zIndex: '10001'}}>
                    <CloseIcon size="large" color="action" />
                </Button>
            )}
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: isOpen,
                    [classes.drawerClose]: !isOpen,
                  })}
                  classes={{
                    paper: clsx({
                      [classes.drawerOpen]: isOpen,
                      [classes.drawerClose]: !isOpen,
                    }),
                  }}
            >
                {!isOpen ? closedView : <TasksMenu reload={reload} setReload={setReload} />}
            </Drawer>
        </div>
    )
} 