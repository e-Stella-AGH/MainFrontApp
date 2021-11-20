import {Button, Card, CardActions, Divider, TextField, Typography, useTheme} from '@material-ui/core'
import {MarkdownEditor} from '../commons/MarkdownEditor'
import {useState} from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {TagsList} from './TagsList'
import '../../App.css';
import {useDevMail} from '../../utils/hooks/useDevMail';
import {encodeBase64} from '../../utils/hooks/Base64';
import {useDevPassword} from '../../utils/hooks/useDevPassword';
import {NoteApi} from '../../utils/apis/NoteApi';
import Swal from 'sweetalert2'
import {withSwal} from '../commons/formsCommons/WithSwal'
import { jwtUtils } from '../../utils/jwt/jwtUtils'

export const AddNote = ({ onCancel, uuid, uuid_key, setReload, shouldUseAuthFetchToPost }) => {

    const theme = useTheme()
    const {getEncodedDevPassword} = useDevPassword()

    const [noteText, setNoteText] = useState('')
    const [tags, setTags] = useState([])
    const [currentTag, setCurrentTag] = useState('')

    const {getDevMail, setDevMail} = useDevMail()

    const handleNoteTextChange = ({html, text}) => {
        setNoteText(text)
    }

    const handleAddCurrentTag = () => {
        setTags([...tags, currentTag])
        setCurrentTag('')
    }

    const deleteTag = (tag) => {
        setTags(tags.filter(item => item != tag))
    }

    const addNoteApiCall = (mail) => {
        if (shouldUseAuthFetchToPost) {
            return () => NoteApi.addNoteFromHr({
                key: uuid_key,
                paramId: uuid,
                note_body: {
                    author: mail,
                    tags: tags,
                    fileBase64: encodeBase64(noteText)
                }
            })
        } else return () => NoteApi.addNote({
            key: uuid_key,
            paramId: uuid,
            note_body: {
                author: mail,
                tags: tags,
                fileBase64: encodeBase64(noteText)
            },
            dev_password: getEncodedDevPassword()
        })
    }

    const doAddNote = (mail) => {
        withSwal({
            loadingTitle: 'Adding Note',
            promise: addNoteApiCall(mail),
            successSwalTitle: 'Note successfully added',
            successFunction: () => {
                setReload?.(reload => !reload)
            }
        })
        setTags([])
        setNoteText('')
        onCancel()
    }

    const addNote = () => {
        if (shouldUseAuthFetchToPost) {
            const mail = jwtUtils.getUser().mail
            doAddNote(mail)
        } else {
            addDevNote()
        }
    }

    const addDevNote = () => {
        const devMail = getDevMail()
        if (!devMail) {
            Swal.fire({
                title: "Missing informations!",
                html: 'Please, provide your mail, so everyone knows, who you are.<br /><input type="text" id="mail" class="swal2-input" placeholder="Mail">',
                icon: 'warning',
                preConfirm: () => {
                    const mail = Swal.getPopup().querySelector('#mail').value
                    if (!mail) {
                        Swal.showValidationMessage(`Please enter your mail`)
                    } else {
                        setDevMail(mail)
                    }
                    return { mail }
                }
            }).then(result => {
                doAddNote(result.value.mail)
            })
        } else {
            doAddNote(devMail)
        }
    }

    return (
        <Card style={{marginLeft: 'auto', marginRight: 'auto', width: '80%', marginTop: '1em', padding: '1em', textAlign: 'left'}} variant='outlined'>

            <div style={{display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'base-line'}}>
                <Typography style={{marginBottom: '10px'}}>Tags:</Typography>
                <TagsList tags={tags} deletable onDelete={deleteTag} />
            </div>

            <div style={{display: 'flex', gap: '10px', justifyContent: 'space-between'}}>
                <TextField label="Add Tag" variant="outlined" value={currentTag} style={{width: '90%'}} onChange={({target}) => setCurrentTag(target.value)} />
                <Button onClick={handleAddCurrentTag}><AddCircleOutlineIcon color="action" /></Button>
            </div>

            <Divider style={{margin: '1em 0'}} />

            <Typography>Note:</Typography>
            <MarkdownEditor handleChange={handleNoteTextChange} style={{height: '100px'}} view={{menu: false, html: false}}/>
            
            <CardActions>
                <div style={{display: 'flex', flexFlow: 'row wrap', gap: '1em', justifyContent: 'space-between', width: '100%'}}> 
                    <Button size="small" onClick={onCancel} style={{ border: `1px solid ${theme.status.danger.main}`, color: theme.status.danger.main, width: '40%' }} varient="outline">
                        Cancel
                    </Button>
                    <Button onClick={addNote} size="small" style={{ background: theme.palette.secondary.dark, color: theme.palette.background.main, width: '40%' }} variant="contained">
                        Add
                    </Button>
                </div>
            </CardActions>
        </Card>
    )
}