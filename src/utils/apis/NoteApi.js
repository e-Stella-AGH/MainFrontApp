import {checkedFetch} from '../chekedFetch'
import {recruitmentServiceBasicAPILink} from './APILinks'
import { authFetch } from '../authFetch'

export const NoteApi = {

    addNote: ({ key, paramId, note_body, dev_password }) => {
        const param = key && paramId ? `?${key}=${paramId}` : ''
        return checkedFetch(`${recruitmentServiceBasicAPILink}/api/applications/add_notes${param}`, {
            method: 'PUT',
            body: JSON.stringify({"notes": [note_body]}),
            headers: {
                'x-dev-password': dev_password,
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        })
        
    },

    addNoteFromHr: ({ key, paramId, note_body }) => {
        const param = key && paramId ? `?${key}=${paramId}` : ''
        return authFetch(`${recruitmentServiceBasicAPILink}/api/applications/add_notes${param}`, {
            method: 'PUT',
            body: JSON.stringify({"notes": [note_body]}),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

}