import { useState } from 'react';
import { useDevPassword } from '../../utils/hooks/useDevPassword';
import { useParams } from 'react-router-dom'
import { TasksPassword } from './TasksPassword';

export const WithDevPassword = ({ WrappedComponent, wrappedProps, createPassword }) => {
    const {id} = useParams()

    const [password, setPassword] = useState("")
    const { set } = useDevPassword()

    const resetDevPassword = () => {
        set("")
        setPassword("")
    }

    const handleSubmit = (password) => {
        set(createPassword(id, password))
        setPassword(password)
    }

    return !!password ? <WrappedComponent {...wrappedProps} id={id} resetDevPassword={resetDevPassword} /> : <TasksPassword handleSubmit={handleSubmit}/>
}