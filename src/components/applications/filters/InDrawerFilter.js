import { useState } from 'react'
import { filterTypes } from '../../../utils/Enums'
import {CustomSwitch} from './CustomSwitch'
import { Button, Divider, Card, Typography } from '@material-ui/core'

export const ApplicationsInDrawerFilter = ({ items, fixedItems, filters, onFilterSubmitted, toggleDrawer }) => {

    const possibleStages = [...new Set(fixedItems.map(item => item.stage.type))]
    const statuses = [...new Set(fixedItems.map(item => item.status))]
    const tags = fixedItems.reduce((acc, item) => [...acc, ...item.tags], [])

    const [toggledStages, setToggledStages] = useState([])

    const handleStageChange = (stage, isToggled) => {
        if (isToggled) {
            setToggledStages([...toggledStages, stage])
        } else {
            setToggledStages(toggledStages.filter(toggled => toggled !== stage))
        }
    }

    const createFilters = () => [
        {type: filterTypes.PROCESS_STAGE, value: toggledStages}
    ]

    const handleFilterSubmit = () => {
        toggleDrawer()
        onFilterSubmitted(createFilters())
    }

    const calculateWidth = () => {
        const width = window.screen.width
        if (width < 700) {
            return 0.6 * width
        } else {
            return 0.3 * width
        }
    }

    return (
        <div style={{width: `${calculateWidth()}px`, padding: "2em"}}>

            <Card variant="outlined" style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', padding: '1em'}}>
                <Typography variant="h6">Current Process Stage:</Typography>
                {possibleStages.map((stage, idx) => <CustomSwitch key={idx} name={stage} onChange={(isToggled) => handleStageChange(stage, isToggled)} />)}
            </Card>
 
            <Button style={{position: 'absolute', bottom: '5%', right: '20%'}} type="outlined" onClick={handleFilterSubmit}>Filter</Button>
        </div>
    )
}