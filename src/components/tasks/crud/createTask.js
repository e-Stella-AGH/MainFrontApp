import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {AddDescription} from "./description/AddDescription";
import {convertFileToBase64} from "../../../utils/apis/files";
import {AddTests} from "./tests/AddTests";
import {AddDeadline} from "./AddDeadline";
import {tasksApi} from "../../../utils/apis/TasksApi";

let task = {}

const clearTask = () => task = {}

const handleMarkdownChange = ({html, text}) => {
    clearTask()
    task['descriptionFileName'] = 'description.md'
    task['descriptionBase64'] = window.btoa(text)
}

const handleTextChange = (text) => {
    clearTask()
    task['descriptionFileName'] = "description.txt"
    task['descriptionBase64'] = window.btoa(text)
}

const handleFileChangeDescription = async (value) => {
    clearTask()

    const file = await handleFileChange(value, 'descriptionBase64')
    task['descriptionFileName'] = file.fileName
}

const handleFileChangeTests = async (value) => {
    delete task['testsBase64']
    await handleFileChange(value, 'testsBase64')
}

const handleFileChange = async (value, key) => {
    const file = {
        fileName: value.name,
        fileBase64: await convertFileToBase64(value)
    }

    task[key] = file.fileBase64.substring(
        file.fileBase64.indexOf("base64") + 7
    )
    return file
}

const basicSwal = {
    title: 'Add task',
    showCancelButton: true,
    confirmButtonColor: '#41A317',
    confirmButtonText: 'Next',
    allowOutsideClick: false,
    width: '70%'
}

const MySwal = withReactContent(Swal)

export const createTask = (tasks, reload, setReload) => {
    MySwal.fire({
        ...basicSwal,
        html: <AddDescription
            handleChange={{'md': handleMarkdownChange, 'text': handleTextChange, 'file': handleFileChangeDescription}}/>
    }).then(result => {
        if (result.isConfirmed) {
            createTests(tasks, reload, setReload)
        }
    })
}


const handleManualTestsChange = (testCases) => {
    delete task['testsBase64']
}

const createTests = (tasks, reload, setReload) => {
    MySwal.fire({
        ...basicSwal,
        html: <AddTests handleChange={{'file': handleFileChangeTests, 'manual': handleManualTestsChange}}/>
    }).then(result => {
        if(result.isConfirmed) {
            createTimeLimit(tasks, reload, setReload)
        }
    })
}

const createTimeLimit = (tasks, reload, setReload) => {
    MySwal.fire({
        ...basicSwal,
        input: 'number',
        text: 'Add time limit'
    }).then(result => {
        if(result.isConfirmed) {
            task['timeLimit'] = Number(result.value)
            createDeadline(tasks, reload, setReload)
        }
    })
}

const createDeadline = (tasks, reload, setReload) => {
    MySwal.fire({
        ...basicSwal,
        html: <AddDeadline handleChange={(date) => task['deadline'] = date} />,
        confirmButtonText: 'Create'
    }).then(result => {
        if(result.isConfirmed) {
            create(tasks, reload, setReload)
        }
    })
}

const create = (tasks, reload, setReload) => {
    tasksApi.updateTasks([...tasks, task])
        .then(_ => setReload(!reload))
}