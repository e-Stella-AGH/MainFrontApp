import {useEffect, useState} from 'react'
import {tasksApi} from '../../../utils/apis/tasksAPI';
import {useDevPassword} from '../../../utils/hooks/useDevPassword'
import {NotesDrawer} from '../../notes/NotesDrawer';
import {TasksCarousel} from './TasksCarousel'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'
import {Typography} from '@material-ui/core'

export const ReviewTask = ({ id: taskStageUUID }) => {

    const { getEncoded } = useDevPassword()
    
    const history = useHistory()

    const [notes, setNotes] = useState([])
    const [tasks, setTasks] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
       tasksApi.getNotesWithTasksByTaskUUID(taskStageUUID, getEncoded())
            .then(data => {
                console.log(data)
                setNotes(data?.notes || [])
                setTasks(data?.tasks || [])
            })
            .catch( err =>
                Swal.fire({
                    title: "You're not supposed to be here!",
                    text: "We're sorry, but password you have provided was incorrect.",
                    icon: "error"
                }).then(() => {
                    history.push('/')
                })
            )
    }, [taskStageUUID, reload])

    

    return(
        <div>
            <NotesDrawer notes={notes} uuid={taskStageUUID} uuid_key="task_note" reload={reload} setReload={setReload} />
            { tasks?.length > 0 ? <TasksCarousel tasks={tasks} /> : <Typography variant="h5" style={{textAlign: 'center'}}> There are no tasks results to show! </Typography>}
        </div>
    )
}