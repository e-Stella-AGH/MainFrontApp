import { useState } from 'react';
import { useDevPassword } from '../../utils/hooks/useDevPassword';
import { useParams } from 'react-router-dom'
import { TasksPassword } from './TasksPassword';

export const WithDevPassword = ({ WrappedComponent, wrappedProps, createPassword, text }) => {

    const params = useParams()
    
    const [password, setPassword] = useState("")
    const { set, get } = useDevPassword()

    const handleSubmit = (password) => {
        set(createPassword(params.id, password))
        setPassword(password)
    }

    return !!password || get() ? <WrappedComponent {...wrappedProps} id={params.id} {...params} /> : <TasksPassword handleSubmit={handleSubmit} text={text}/>
} 

