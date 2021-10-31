import {useState, useEffect} from 'react'
import {tasksApi} from '../../../utils/apis/tasksAPI';
import { useDevPassword } from '../../../utils/hooks/useDevPassword'
import { NotesDrawer } from '../../notes/NotesDrawer';
import { TasksCarousel } from './TasksCarousel'
import { dummyData } from './dummyData';

export const ReviewTask = ({ id: taskStageUUID }) => {

    const { getEncoded } = useDevPassword()

    const [notes, setNotes] = useState([])
    const [tasks, setTasks] = useState([])

    useEffect(() => {
       tasksApi.getNotesWithTasksByTaskUUID(taskStageUUID, getEncoded())
            .then(data => {
                console.log(dummyData)
                setNotes(dummyData.notes || [])
                setTasks(dummyData.tasks || [])
            })
    }, [taskStageUUID])

    

    return(
        <div>
            <NotesDrawer notes={notes} />
            <TasksCarousel tasks={tasks} />
        </div>
    )
}