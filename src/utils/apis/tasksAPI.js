import {recruitmentServiceBasicAPILink} from "./APILinks";
import Swal from 'sweetalert2'
import { checkedFetch } from '../chekedFetch'
import { withSwal } from '../../components/commons/formsCommons/WithSwal'
import { encodeBase64 } from "../hooks/Base64";


const fallbackTask = { id: 41, descriptionBase64: 'IyBBbHBoYWJldA0KDQojIyBEZXNjcmlwdGlvbg0KR2l2ZW4gYSBwb3NpdGl2ZSBudW1iZXIgX19uX18sIHByaW50IF9fbl9fIGZpcnN0IGxldHRlcnMgb2YgYWxwaGFiZXQuDQoNCiMjIEV4YW1wbGUNCmBgYA0KaW5wdXQ6IDUNCg0Kb3V0cHV0OiAiYWJjZGUiDQpgYGA=', descriptionFileName: 'fakeTaskDescription.md', testsBase64: 'Ww0KICB7DQogICAgInRlc3RDYXNlSWQiOiAxLA0KICAgICJ0ZXN0RGF0YSI6IDEsDQogICAgImV4cGVjdGVkUmVzdWx0IjogImEiDQogIH0sDQogIHsNCiAgICAidGVzdENhc2VJZCI6IDIsDQogICAgInRlc3REYXRhIjogMiwNCiAgICAiZXhwZWN0ZWRSZXN1bHQiOiAiYWIiDQogIH0sDQogIHsNCiAgICAidGVzdENhc2VJZCI6IDMsDQogICAgInRlc3REYXRhIjogNSwNCiAgICAiZXhwZWN0ZWRSZXN1bHQiOiAiYWJjZGUiDQogIH0NCl0=', timeLimit: 30 }

export const tasksApi = {

    getTask: (processId) => {
        if(processId){
            Swal.showLoading()
            return checkedFetch(`${recruitmentServiceBasicAPILink}/api/tasks?process=${processId}`)
                .then(response => {
                    Swal.close() 
                    return response.json()
                })
                .catch(err => {
                    Swal.close()
                    return new Promise(resolve => resolve([fallbackTask]))
                })
        } else {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: `Looks like somebody didn't add a task but wants to solve one something, we've prepared a task for you though!`
            })
            return new Promise(resolve => resolve([fallbackTask]))
        }
    },

    getTasksByOrganization: (organizationId, password) => {
        return checkedFetch(`${recruitmentServiceBasicAPILink}/api/tasks?owner=${organizationId}`, {
            method: 'GET',
            headers: {
                'x-dev-password': password
            }
        }).then(response => response.json())
        .catch(err => {
            Swal.close()
            Swal.fire({
                icon: 'error',
                text: `We're sorry, but we couldn't fetch tasks from this organization.`
            })
        })
    },

    getTasks: (tasksStageId) => {
        if (tasksStageId) {
            return checkedFetch(`${recruitmentServiceBasicAPILink}/api/tasks?taskStage=${tasksStageId}`)
                .then(response => {
                    Swal.close()
                    return response.json()
                })
                .catch(err => {
                    Swal.close()
                    return new Promise(resolve => resolve([fallbackTask]))
                })
        } else {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: `Looks like somebody didn't add a task but wants to solve one something, we've prepared a task for you though!`
            })
            return new Promise(resolve => resolve([fallbackTask]))
        }
    },

    codeCheckerLink: "https://e-stella-code-executor.herokuapp.com",

    getNotesWithTasksByTaskUUID: (taskStageUUID, devPassword) => {
        return checkedFetch(`${recruitmentServiceBasicAPILink}/api/applications/get_notes?task_note=${taskStageUUID}&with_tasks=true`, {
            method: "GET",
            headers: {
                "X-Dev-Password": devPassword
            }
        })
            .then(response => response.json())
    },

    getTasksFromOrganization: (organizationUUID, devPassword) => {
        return checkedFetch(`${recruitmentServiceBasicAPILink}/api/tasks?owner=${organizationUUID}`, {
            method: 'GET',
            headers: {
                'x-dev-password': devPassword
            }
        }).then(response => response.json())
    },

    getTasksFromTaskStage: (taskStageUUID, devPassword) => {
        return checkedFetch(`${recruitmentServiceBasicAPILink}/api/tasks?taskStage=${taskStageUUID}`, {
            method: 'GET',
            headers: {
                'x-dev-password': devPassword
            }
        }).then(response => response.json())
    },

    updateTasks: (task, credentials, setReload) => {
        const promise = () => checkedFetch(`${recruitmentServiceBasicAPILink}/api/tasks?owner=${credentials.organizationId}`, {
            method: 'POST',
            headers: {
                'x-dev-password': credentials.password,
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        withSwal({
            loadingTitle: 'Updating Task',
            promise,
            successFunction: () => setReload(reload => !reload)
        })
    },

    assignTasks: (tasksIds, password, setReload, key, keyValue) => {
        const promise = () => checkedFetch(`${recruitmentServiceBasicAPILink}/api/taskStages?${key}=${keyValue}`, {
            method: "PUT",
            body: JSON.stringify({tasks: tasksIds}),
            headers: {
                'content-type': 'application/json',
                'x-dev-password': password
            }
        })
        withSwal({
            loadingTitle: 'Updating assigned tasks',
            successSwalTitle: 'Task successfully assigned!',
            promise,
            successFunction: () => setReload(reload => !reload)
        })
    },

    getTasksByInterviewId: (interviewId) => {
        return checkedFetch(`${recruitmentServiceBasicAPILink}/api/tasks?interviewId=${interviewId}`, {
            method: 'GET'
        }).then(response => response.json())
    }

}