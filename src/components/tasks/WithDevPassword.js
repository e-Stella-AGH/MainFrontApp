import { useState } from 'react';
import { useDevPassword } from '../../utils/hooks/useDevPassword';
import { useParams } from 'react-router-dom'
import { TasksPassword } from './TasksPassword';

export const WithDevPassword = ({ WrappedComponent, wrappedProps, createPassword }) => {

    const params = useParams()

    const [password, setPassword] = useState("")
    const { set } = useDevPassword()

    const handleSubmit = (password) => {
        set(createPassword(params.id, password))
        setPassword(password)
    }

    return !!password ? <WrappedComponent {...wrappedProps} id={params.id} {...params} /> : <TasksPassword handleSubmit={handleSubmit}/>
} 

