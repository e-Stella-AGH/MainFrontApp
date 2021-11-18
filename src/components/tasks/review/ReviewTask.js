import {useEffect, useState} from 'react'
import {tasksApi} from '../../../utils/apis/tasksAPI';
import {useDevPassword} from '../../../utils/hooks/useDevPassword'
import {NotesDrawer} from '../../notes/NotesDrawer';
import {TasksCarousel} from './TasksCarousel'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'
import {Typography} from '@material-ui/core'
import CenteredCircularProgress from '../../commons/CenteredCircularProgress'

export const ReviewTask = ({ id: taskStageUUID }) => {

    const { getEncodedDevPassword } = useDevPassword()
    
    const history = useHistory()

    const [notes, setNotes] = useState([])
    const [tasks, setTasks] = useState([])
    const [reload, setReload] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
       tasksApi.getNotesWithTasksByTaskUUID(taskStageUUID, getEncodedDevPassword())
            .then(data => {
                setNotes(data?.notes || [])
                setTasks(data?.tasks || [])
                setIsFetching(false)
            })
            .catch( err => {
                    setIsFetching(false)
                    Swal.fire({
                        title: "You're not supposed to be here!",
                        text: "We're sorry, but password you have provided was incorrect.",
                        icon: "error"
                    }).then(() => {
                        history.push('/')
                    })
                }   
            )
    }, [taskStageUUID, reload])

    

    return(
        <div>
            {
                isFetching ? <CenteredCircularProgress size={100} /> : (
                    <div>
                        <NotesDrawer notes={notes} uuid={taskStageUUID} uuid_key="task_note" reload={reload} setReload={setReload} />
                        { tasks?.length > 0 && !isFetching ? <TasksCarousel tasks={tasks} /> : <Typography variant="h5" style={{textAlign: 'center'}}> There are no tasks results to show! </Typography>}
                    </div>
                )
            }
        </div>
    )
}