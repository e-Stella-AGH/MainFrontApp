import {useState} from 'react';
import {useDevPassword} from '../../utils/hooks/useDevPassword';
import {useParams} from 'react-router-dom'
import {TasksPassword} from './TasksPassword';

export const WithDevPassword = ({ WrappedComponent, wrappedProps, createPassword, text }) => {

    const params = useParams()
    
    const [password, setPassword] = useState("")
    const { setDevPassword, getDevPassword } = useDevPassword()

    const handleSubmit = (password) => {
        setDevPassword(createPassword(params.id, password))
        setPassword(password)
    }

    return !!password || getDevPassword() ? <WrappedComponent {...wrappedProps} id={params.id} {...params} /> : <TasksPassword handleSubmit={handleSubmit} text={text}/>
} 

