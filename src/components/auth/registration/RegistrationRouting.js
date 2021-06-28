import {useState} from "react";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {UserRegistration} from "./UserRegistration";

export const RegistrationRouting = (props) => {

    const [render, setRender] = useState("user")

    const handleChange = ({ target }) => {
        setRender(target.value)
        console.log(target.value)
    }

    const getRegistrationForm = () => {
        switch (render) {
            case 'user':
                return <UserRegistration />
            default:
                return null
        }
    }

    return(
        <div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <RadioGroup name="registrationRender" value={render} onChange={handleChange}
                style={{display: "inline", marginBottom: "2em"}}>
                    <FormControlLabel value="user" control={<Radio />} label="User Registration" />
                    <FormControlLabel value="company" control={<Radio />} label="Company Registration" />
                </RadioGroup>
            </div>
            {getRegistrationForm()}
        </div>
    )
}