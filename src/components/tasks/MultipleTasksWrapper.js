import {tasksApi} from "../../utils/apis/TasksApi";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Carousel} from 'react-responsive-carousel';
import CenteredCircularProgress from "../commons/CenteredCircularProgress";
import TaskWrapper from "./TaskWrapper";
import {Button, Grid} from "@material-ui/core";

export const MultipleTasksWrapper = ({ id: propId, toSolveTask = true, submitLeftOffset = 0 }) => {

    let { taskStageUUID } = useParams()

    if(!taskStageUUID) taskStageUUID = propId

    const [tasks, setTasks] = useState([])
    const [isFetching, setIsFetching] = useState(true)

    const [currentSlide, setCurrentSlide] = useState(0)

    const prev = () => setCurrentSlide(state => state - 1)
    const next = () => setCurrentSlide(state => state + 1)
    const updateCurrentSlide = (index) => setCurrentSlide(index)

    useEffect(() =>
        tasksApi.getTask(taskStageUUID).then(tasks => {
            setTasks(tasks)
            setIsFetching(false)
        }),
        [setIsFetching, setTasks, taskStageUUID]
    )

    const editors = tasks.map(task => <TaskWrapper
        task={task}
        taskStageUUID={taskStageUUID}
        toSolveTask={toSolveTask}
        submitLeftOffset={submitLeftOffset}
    />)

    const PrevButton = () => <Button
        onClick={prev}
        variant="contained"
        color="primary"
        disabled={currentSlide === 0}
        fullWidth>Previous Task</Button>

    const NextButton = () => <Button
        onClick={next}
        variant="contained"
        color="primary"
        disabled={currentSlide === tasks.length - 1}
        fullWidth>Next Task</Button>

    return isFetching ? <CenteredCircularProgress size={100} /> : <div>
        <Grid style={{padding: '1em', backgroundColor: "#1e1e1e"}} container spacing={2}>
            <Grid item xs={12} md={6}><PrevButton /></Grid>
            <Grid item xs={12} md={6}><NextButton /></Grid>
        </Grid>
        <Carousel
            showIndicators={false}
            showArrows={false}
            showStatus={true}
            selectedItem={currentSlide}
            onChange={ind => updateCurrentSlide(ind)}
            statusFormatter={(curr, items) => `Task ${curr} of ${items}`}
        >
            {editors}
        </Carousel>
    </div>
}