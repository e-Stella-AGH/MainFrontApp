import {recruitmentServiceBasicAPILink} from "./APILinks";
import Swal from 'sweetalert2'
import { checkedFetch } from '../chekedFetch'


const fallbackTask1 = { id: 41, descriptionBase64: 'IyBBbHBoYWJldA0KDQojIyBEZXNjcmlwdGlvbg0KR2l2ZW4gYSBwb3NpdGl2ZSBudW1iZXIgX19uX18sIHByaW50IF9fbl9fIGZpcnN0IGxldHRlcnMgb2YgYWxwaGFiZXQuDQoNCiMjIEV4YW1wbGUNCmBgYA0KaW5wdXQ6IDUNCg0Kb3V0cHV0OiAiYWJjZGUiDQpgYGA=', descriptionFileName: 'fakeTaskDescription.md', testsBase64: 'Ww0KICB7DQogICAgInRlc3RDYXNlSWQiOiAxLA0KICAgICJ0ZXN0RGF0YSI6IDEsDQogICAgImV4cGVjdGVkUmVzdWx0IjogImEiDQogIH0sDQogIHsNCiAgICAidGVzdENhc2VJZCI6IDIsDQogICAgInRlc3REYXRhIjogMiwNCiAgICAiZXhwZWN0ZWRSZXN1bHQiOiAiYWIiDQogIH0sDQogIHsNCiAgICAidGVzdENhc2VJZCI6IDMsDQogICAgInRlc3REYXRhIjogNSwNCiAgICAiZXhwZWN0ZWRSZXN1bHQiOiAiYWJjZGUiDQogIH0NCl0=', timeLimit: 30 }
const fallbackTask2 = { id: 53, descriptionBase64: 'IyBBbHBoYWJldAoKIyMgRGVzY3JpcHRpb24KR2l2ZW4gYSBwb3NpdGl2ZSBudW1iZXIgX19uX18sIHByaW50IF9fbl9fIGBiYHMKCiMjIEV4YW1wbGUKYGBgCmlucHV0OiA0CgpvdXRwdXQ6ICJiYmJiIgpgYGA=', descriptionFileName: 'fakeTaskDescription.md', testsBase64: 'WwogIHsKICAgICJ0ZXN0Q2FzZUlkIjogMSwKICAgICJ0ZXN0RGF0YSI6IDEsCiAgICAiZXhwZWN0ZWRSZXN1bHQiOiAiYiIKICB9LAogIHsKICAgICJ0ZXN0Q2FzZUlkIjogMiwKICAgICJ0ZXN0RGF0YSI6IDIsCiAgICAiZXhwZWN0ZWRSZXN1bHQiOiAiYmIiCiAgfSwKICB7CiAgICAidGVzdENhc2VJZCI6IDMsCiAgICAidGVzdERhdGEiOiA1LAogICAgImV4cGVjdGVkUmVzdWx0IjogImJiYmJiIgogIH0KXQ==', timeLimit: 70 }

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
                    return new Promise(resolve => resolve([fallbackTask1, fallbackTask2]))
                })
        } else {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: `Looks like somebody didn't add a task but wants to solve one something, we've prepared a task for you though!`
            })
            return new Promise(resolve => resolve([fallbackTask1, fallbackTask2]))
        }
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
                    return new Promise(resolve => resolve([fallbackTask1, fallbackTask2]))
                })
        } else {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: `Looks like somebody didn't add a task but wants to solve one something, we've prepared a task for you though!`
            })
            return new Promise(resolve => resolve([fallbackTask1, fallbackTask2]))
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
    }

}