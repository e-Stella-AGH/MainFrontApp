import {JitsiComponent} from "e-stella-jitsi";
import {MeetingFab} from "./MeetingFab";
import {useEffect, useState} from "react";
import {Whiteboard} from "e-stella-whiteboard";
import {AssignTasks} from "../../tasks/AssignTasks";
import {WithDevPassword} from "../../tasks/WithDevPassword"
import {tasksApi} from "../../../utils/apis/tasksAPI";
import {interviewAPI} from "../../../utils/apis/InterviewAPI";
import {makeStyles} from '@material-ui/core/styles';
import {NotesMenu} from '../../notes/NotesMenu';
import {Button, Divider, Drawer, List, ListItem} from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {useDevPassword} from "../../../utils/hooks/useDevPassword";
import {constants} from '../../../utils/constants'
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import Swal from "sweetalert2";
import {MultipleTasksWrapper} from "../../tasks/MultipleTasksWrapper";

export const JitsiWrapper = ({ admin, roomName, displayName, interviewId, companyId }) => {

    const [jitsiHeight, setJitsiHeight] = useState('calc(100vh - 60px)')
    const [jitsiWidth, setJitsiWidth] = useState('100%')
    const [actionComponent, setActionComponent] = useState(null)
    const [taskStageUUID, setTaskStageUUID] = useState(null)

    useEffect(() => {
        interviewAPI.getTaskStageUUIDByInterviewId(interviewId)
            .then(data => setTaskStageUUID(data.taskStageUUID))
    }, [interviewId, companyId])

    const getWhiteboardCode = () => {
        if (roomName.length < 15) return 'abcdefghijklmnopqrst'
        return roomName
    }
    const addWhiteboard = () => {
        setJitsiWidth('20%')
        setJitsiHeight('calc(100vh - 60px)')
        setActionComponent(
            <div style={{float: "left", width: '80%', height: 'calc(100vh-60px)'}}>
                <Whiteboard
                    client_id={process.env.REACT_APP_WHITEBOARD_KEY}
                    code={getWhiteboardCode()}
                />
            </div>
        )
    }

    const defaultView = () => {
        setJitsiHeight('calc(100vh-60px)')
        setJitsiWidth('100%')
        setActionComponent(null)
    }

    const showTask = () => {
        setJitsiWidth('20%')
        setActionComponent(
            <div style={{float: "left", width: '80%', height: '80vh', overflow: 'scroll'}}>
                <MultipleTasksWrapper fetchTasks={getTasksByInterviewUUID} submitLeftOffset={'25%'} id={taskStageUUID}/>
            </div>
        )
    }

    const getTasksByInterviewUUID = () => tasksApi.getTasksByInterviewId(interviewId)

    return (
        <div>
            {
                admin &&
                    <AdminMeetingDrawer interviewId={interviewId} companyId={companyId} />
            }
            <MeetingFab onWhiteboard={addWhiteboard} onDefaultView={defaultView} onTask={showTask}/>
            <div style={{height: jitsiHeight, width: jitsiWidth, float: "left"}}>
                <JitsiComponent admin={admin} roomName={roomName} displayName={displayName}/>
            </div>
            {actionComponent}
        </div>
    )
}


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

const AdminMeetingDrawer = ({ interviewId, companyId }) => {

    const [openNotesModal, setOpenNotesModal] = useState(false)
    const [reload, setReload] = useState(false)
    const [openTasksModal, setOpenTasksModal] = useState(false)

    const { getDevPassword, setDevPassword } = useDevPassword()

    const classes = useStyles()

    const getNotesView = () => (
        <WithDevPassword
            WrappedComponent={NotesMenuWrapper}
            wrappedProps={{
                reload, setReload, interviewId
            }}
            createPassword={(id, password) => `${companyId}:${password}`}
            text="Insert password"
        />
    )

    const doOpenTasksModal = () => {
        if (getDevPassword()) {
            setOpenTasksModal(true)
        } else {
            Swal.fire({
                title: 'Provide your password from mail!',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Submit'
            }).then(result => {
                if (result.isConfirmed) {
                    setDevPassword(`${companyId}:${result.value}`)
                    setOpenTasksModal(true)
                }
            })
        }
    }

    const closedView = (
            <List style={{marginTop: `calc(${constants.navbar_height} + 1em)`, display: 'flex', flexDirection: 'column'}}>
                <ListItem>
                    <Button onClick={() => setOpenNotesModal(true)}>
                        <NoteAddIcon fontSize="large" color="action"/>
                    </Button>
                </ListItem>
                    <Divider style={{margin: '1em 0'}} />
                <ListItem>
                    <Button onClick={() => doOpenTasksModal()}>
                        <AssignmentIcon fontSize="large" color="action" />
                    </Button>
                </ListItem>
            </List>
    )

    return (
        <div>
            {openNotesModal && (
                <Button onClick={() => setOpenNotesModal(false)} style={{position:'absolute', top: '5em', left: '20px', zIndex: '10001'}}>
                    <CloseIcon size="large" color="action" />
                </Button>
            )}
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: openNotesModal,
                    [classes.drawerClose]: !openNotesModal,
                    })}
                    classes={{
                    paper: clsx({
                        [classes.drawerOpen]: openNotesModal,
                        [classes.drawerClose]: !openNotesModal,
                    }),
                    }}
            >
                {openNotesModal ? getNotesView() : closedView}
                <AssignTasksWrapper openTasksModal={openTasksModal} setOpenTasksModal={setOpenTasksModal} interviewId={interviewId} organizationId={companyId} reload={reload} setReload={setReload} />
            </Drawer>
        </div>
    )
}

const NotesMenuWrapper = ({reload, setReload, interviewId}) => {

    const {getEncodedDevPassword} = useDevPassword()
    const [notes, setNotes] = useState([])

    useEffect(() => {
        interviewAPI.getNotesByInterviewId(interviewId, getEncodedDevPassword())
            .then(data => setNotes(data.notes))
    }, [interviewId, reload])

    return (
        <NotesMenu
            notes={notes}
            uuid={interviewId}
            uuid_key="interview_note"
            reload={reload}
            setReload={setReload}
        />
    )
}

const AssignTasksWrapper = ({openTasksModal, setOpenTasksModal, interviewId, organizationId, reload, setReload}) => {

    const {getEncodedDevPassword} = useDevPassword()
    const devPassword = getEncodedDevPassword()
    const [organizationTasks, setOrganizationTasks] = useState([])
    const [alreadyAssignedTasks, setAlreadyAssignedTasks] = useState([])

    useEffect(() => {
        if(devPassword) {
        tasksApi.getTasksFromOrganization(organizationId, devPassword)
            .then(data => setOrganizationTasks(data))
        tasksApi.getTasksByInterviewId(interviewId)
            .then(data => setAlreadyAssignedTasks(data))
        }
    }, [reload, organizationId, interviewId])

    return (
        <AssignTasks
            modalOptions={{
                open: openTasksModal,
                handleClose: () => setOpenTasksModal(false)
            }}
            alreadyAssignedTasks={alreadyAssignedTasks}
            organizationTasks={organizationTasks}
            setReload={setReload}
            assignKey="interview"
            assignUUIDValue={interviewId}
        />
    )
}