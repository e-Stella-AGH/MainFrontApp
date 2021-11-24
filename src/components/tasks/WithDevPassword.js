import {useState} from 'react';
import {useDevPassword} from '../../utils/hooks/useDevPassword';
import {useParams} from 'react-router-dom'
import {TasksPassword} from './TasksPassword';
import {Button, useTheme} from '@material-ui/core';
import Swal from 'sweetalert2'

export const WithDevPassword = ({ WrappedComponent, wrappedProps, createPassword, text }) => {

    const params = useParams()

    const theme = useTheme()
    
    const [password, setPassword] = useState("")
    const { setDevPassword, getDevPassword, deleteDevPassword } = useDevPassword()

    const handleSubmit = (password) => {
        setDevPassword(createPassword(params.id, password))
        setPassword(password)
    }

    const clearDevPassword = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'This operation cannot be undone',
            showCancelButton: true
        }).then(result => {
            if (result.isConfirmed) {
                deleteDevPassword()
                setPassword("")
            }
        })
    }

    return !!password || getDevPassword() ? (
        <>
            <Button style={{ 
                    background: theme.status.danger.main,
                    color: theme.palette.background.main,
                    position: 'absolute',
                    bottom: '3em',
                    left: '1em',
                    zIndex: 1660
                }}
                onClick={clearDevPassword}
                size="large"
            >Reset my password</Button>
            <WrappedComponent {...wrappedProps} id={params.id} {...params} />
        </>
        ) : <TasksPassword handleSubmit={handleSubmit} text={text}/>
} 

