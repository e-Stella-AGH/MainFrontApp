import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {AddDescription} from "./description/AddDescription";
import {convertFileToBase64} from "../../../utils/apis/files";
import {AddTests} from "./tests/AddTests";
import {AddDeadline} from "./AddDeadline";
import {withSwal} from "../../commons/formsCommons/WithSwal";
import React from "react";
import {encodeBase64} from "../../../utils/hooks/Base64";

let task = {}

const clearTask = () => task = {}

const handleMarkdownChange = ({text}) => {
    clearTask()
    task['descriptionFileName'] = 'description.md'
    task['descriptionBase64'] = encodeBase64(text)
}

const handleTextChange = (text) => {
    clearTask()
    task['descriptionFileName'] = "description.txt"
    task['descriptionBase64'] = encodeBase64(text)
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

export const createTask = (onCreateTask, setReload) => {
    MySwal.fire({
        ...basicSwal,
        html: <AddDescription
            handleChange={{'md': handleMarkdownChange, 'text': handleTextChange, 'file': handleFileChangeDescription}}/>
    }).then(result => {
        if (result.isConfirmed) {
            createTests(onCreateTask, setReload)
        }
    })
}


const handleManualTestsChange = (testCases) => {
    delete task['testsBase64']
    task['testsBase64'] = encodeBase64(JSON.stringify(testCases))
}

const createTests = (onCreateTask, setReload) => {
    MySwal.fire({
        ...basicSwal,
        html: <AddTests handleChange={{'file': handleFileChangeTests, 'manual': handleManualTestsChange}}/>
    }).then(result => {
        if(result.isConfirmed) {
            createTimeLimit(onCreateTask, setReload)
        }
    })
}

const createTimeLimit = (onCreateTask, setReload) => {
    MySwal.fire({
        ...basicSwal,
        input: 'number',
        text: 'Add time limit'
    }).then(result => {
        if(result.isConfirmed) {
            task['timeLimit'] = Number(result.value)
            createDeadline(onCreateTask, setReload)
        }
    })
}

const createDeadline = (onCreateTask, setReload) => {
    MySwal.fire({
        ...basicSwal,
        html: <AddDeadline handleChange={(date) => task['deadline'] = date} />,
        confirmButtonText: 'Create'
    }).then(result => {
        if(result.isConfirmed) {
            create(onCreateTask, setReload)
        }
    })
}

const create = (onCreateTask, setReload) => {
    withSwal({
        promise: () => onCreateTask(task).then(resp => {
            setReload(reload => !reload)
            return resp
        }),
        successSwalTitle: "Success",
        errorSwalTitle: "Error",
    })
}