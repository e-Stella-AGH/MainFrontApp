import {recruitmentServiceBasicAPILink} from "./APILinks";
import Swal from 'sweetalert2'

export const tasksApi = {

    getTask: (processId) => {
        if(processId){
            return fetch(`${recruitmentServiceBasicAPILink}/api/tasks?process=${processId}`)
                .then(response => response.json())
        } else {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: `Looks like somebody didn't add a task but wants to solve one something!`
            })
            return new Promise(_ => {})
        }
    },

    codeCheckerLink: "https://e-stella-code-executor.herokuapp.com",

    sendTestResult: (body) => {
        return fetch(`${recruitmentServiceBasicAPILink}/api/tasks/taskResult?taskId=${body.task.id}&processId=${body.id}`,{
            method: "POST",
            body: JSON.stringify(body)
        })
    },

    updateTasks: (tasks) => {
        console.log(tasks)
    }
}

