import {checkedFetch} from '../chekedFetch'
import {recruitmentServiceBasicAPILink} from './APILinks'

export const NoteApi = {

    addNote: ({ key, paramId, note_body, dev_password }) => {
        const param = key && paramId ? `?${key}=${paramId}` : ''
        console.log(`${recruitmentServiceBasicAPILink}/api/applications/add_notes${param}`, JSON.stringify([note_body]))
        console.log(dev_password)
        return checkedFetch(`${recruitmentServiceBasicAPILink}/api/applications/add_notes${param}`, {
            method: 'PUT',
            body: JSON.stringify({"notes": [note_body]}),
            headers: {
                'x-dev-password': dev_password,
                'accept': 'application/json',
                'content-type': 'application/json'
            }
        })
        
    }

}