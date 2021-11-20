import { useState } from 'react'
import { Switch } from '@material-ui/core'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {ProcessStage} from '../../../utils/procesStages'
import { applicationStatus } from '../../../utils/Enums'

export const CustomSwitch = ({ onChange, name }) => {

    const [checked, setChecked] = useState(false)

    const handleSwitchChange = ({ target }) => {
        setChecked(target.checked)
        onChange(target.checked)
    }

    const getName = () => name in ProcessStage ? ProcessStage[name].name : name in applicationStatus ? applicationStatus[name] : ''

    return (
        <FormGroup row>
            <FormControlLabel
                control={<Switch checked={checked} onChange={handleSwitchChange} name={getName()} />}
                label={getName()}
            />
        </FormGroup>
    )
}