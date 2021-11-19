import { useState } from 'react'
import { Switch } from '@material-ui/core'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const CustomSwitch = ({ onChange, name }) => {

    const [checked, setChecked] = useState(false)

    const handleSwitchChange = ({ target }) => {
        setChecked(target.checked)
        onChange(target.checked)
    }

    return (
        <FormGroup row>
            <FormControlLabel
                control={<Switch checked={checked} onChange={handleSwitchChange} name={name} />}
                label={name}
            />
        </FormGroup>
    )
}