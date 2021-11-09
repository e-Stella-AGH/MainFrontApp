import {useState} from 'react'
import { Drawer, List, ListItem, Button } from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CloseIcon from '@material-ui/icons/Close';
import {constants} from "../../utils/constants";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { NotesMenu } from './NotesMenu'

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


export const NotesDrawer = ({ notes, uuid, uuid_key, reload, setReload }) => {

    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = useState(false)

    const handleNoteClick = () => {
        setOpen(true)
    }

    const closeNote = () => {
        setOpen(false)
    }

    const closedView = (<List style={{marginTop: `calc(${constants.navbar_height} + 1em)`}}>
                            <ListItem>
                                <Button onClick={handleNoteClick}>
                                    <NoteAddIcon fontSize="large" color="action"/>
                                </Button>
                            </ListItem>
                        </List>)

    return (
        <div>
            {open && (
                <Button onClick={closeNote} style={{position:'absolute', top: '5em', left: '20px', zIndex: '10001'}}>
                    <CloseIcon size="large" color="action" />
                </Button>
            )}
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                  })}
                  classes={{
                    paper: clsx({
                      [classes.drawerOpen]: open,
                      [classes.drawerClose]: !open,
                    }),
                  }}
            >
                {open ? <NotesMenu notes={notes} uuid={uuid} uuid_key={uuid_key} reload={reload} setReload={setReload} /> : closedView}
            </Drawer>
        </div>
    )
}