import {recruitmentServiceBasicAPILink} from "./APILinks";
import Swal from 'sweetalert2'
import {checkedFetch} from '../chekedFetch'
import {devFetch} from "../devFetch";

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
                .catch(() => {
                    Swal.close()
                    return new Promise(resolve => resolve([fallbackTask]))
                })
        } else {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: `Looks like somebody didn't add a task but wants to solve one something, we've prepared a task for you though!`
            })
            return new Promise(_ => fallbackTask)
        }
    },

    getOrganizationTasks: (organizationId, devPassword) =>
        devFetch(
            `${recruitmentServiceBasicAPILink}/api/tasks?owner=${organizationId}`,
            {
                method: "GET"
            },
            devPassword,
            "Problem occurred while getting tasks"
        ).then(response => response.json()),

    codeCheckerLink: "https://e-stella-code-executor.herokuapp.com",


    addTask: (task, organizationUUID, devPassword) =>
        devFetch(
            `${recruitmentServiceBasicAPILink}/api/tasks?owner=${organizationUUID}`,
            {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json"
                }
            },
            devPassword,
            "Problem occurred while creating task"
        ),

    deleteTask: (taskId, organizationUUID, devPassword) =>
        devFetch(
            `${recruitmentServiceBasicAPILink}/api/tasks/${taskId}?owner=${organizationUUID}`,
            {
                method: "DELETE"
            },
            devPassword,
            "Problem occurred while deleting task"
        ),


    /** updateTasks takes array of tasks, task is object {
     *      testsBase64 - base64 encoded tests array,
     *      descriptionFileName - filename of description, extension is important for further usage,
     *      descriptionBase64 - base64 encoded description,
     *      timeLimit - max solution time in full minutes
     * }
     **/
    updateTasks: (tasks, organizationUUID, devPassword) =>
        devFetch(
            `${recruitmentServiceBasicAPILink}/api/tasks?owner=${organizationUUID}`,
            {
                method: "PUT",
                body: JSON.stringify(tasks)
            },
            devPassword,
            "Problem occurred while updating task"
        )
}

