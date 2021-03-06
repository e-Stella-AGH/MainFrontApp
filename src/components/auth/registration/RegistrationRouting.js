import React, {useState} from "react";
import {UserRegistration} from "./UserRegistration";
import {CompanyRegistration} from "./CompanyRegistration";
import {RegistrationRadioButtons} from "./RegistrationRadioButtons";

export const RegistrationRouting = () => {

    const [render, setRender] = useState("user")

    const handleChange = (value) => {
        setRender(value)
    }

    const getRegistrationForm = () => {
        switch (render) {
            case 'user':
                return <UserRegistration />
            case 'company':
                return <CompanyRegistration />
            default:
                return null
        }
    }

    return(
        <div>
            <RegistrationRadioButtons  handleChange={(value) => handleChange(value)} value={render}/>
            {getRegistrationForm()}
        </div>
    )
}