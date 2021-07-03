import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import PropTypes from 'prop-types';

export const RegistrationRadioButtons = (props) => {

    const handleChange = ({ target }) => {
        props.handleChange(target.value)
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <RadioGroup name="registrationRender" value={props.value} onChange={handleChange}
                        style={{display: "inline", marginBottom: "2em"}}>
                <FormControlLabel value="user" control={<Radio/>} label="User Registration"/>
                <FormControlLabel value="company" control={<Radio/>} label="Company Registration"/>
            </RadioGroup>
        </div>
    )
}

RegistrationRadioButtons.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}