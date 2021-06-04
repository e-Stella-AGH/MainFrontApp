import {useState} from "react";
import {Button, TextField} from "@material-ui/core";

export const MeetingDisplayNameForm = (props) => {

    const [name, setName] = useState("")

    const handleClick = () => {
        props.onSubmit(name)
    }

    return (
        <div>
            <TextField value={name} onChange={({target}) => setName(target.value)}/>
            <Button onClick={handleClick}>Submit</Button>
        </div>
    )
}