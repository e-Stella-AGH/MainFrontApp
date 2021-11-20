import { useState } from 'react'
import { filterTypes } from '../../../utils/Enums'
import {CustomSwitch} from './CustomSwitch'
import { Button, Divider, Card, Typography } from '@material-ui/core'

export const ApplicationsInDrawerFilter = ({ items, fixedItems, filters, onFilterSubmitted, toggleDrawer }) => {

    const possibleStages = [...new Set(fixedItems.map(item => item.stage.type))]
    const statuses = [...new Set(fixedItems.map(item => item.status))]
    const tags = fixedItems.reduce((acc, item) => [...acc, ...item.tags], [])

    const [toggledStages, setToggledStages] = useState([])
    const [toggledApplicationStatuses, setToggledApplicationStatuses] = useState([])

    const onStageChange = (stage, isToggled) => {
        if (isToggled) {
            setToggledStages([...toggledStages, stage])
        } else {
            setToggledStages(toggledStages.filter(toggled => toggled !== stage))
        }
    }

    const onApplicationStatusChange = (status, isToggled) => {
        setToggledApplicationStatuses(isToggled ? [...toggledApplicationStatuses, status] : toggledApplicationStatuses.filter(toggle => toggle !== status))
    }

    const createFilters = () => [
        {type: filterTypes.PROCESS_STAGE, value: toggledStages},
        {type: filterTypes.APPLICATION_STAGE, value: toggledApplicationStatuses}
    ]

    const handleFilterSubmit = () => {
        toggleDrawer()
        onFilterSubmitted(createFilters().filter(filter => filter.value?.length !== undefined ? filter.value?.length > 0 : !!filter.value))
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
        <div style={{width: `${calculateWidth()}px`, padding: "2em", marginTop: '3em'}}>

            <FilterCard possibleFilters={statuses} title="Current Application Status:" handleStateChange={onApplicationStatusChange} />

            <FilterCard possibleFilters={possibleStages} title="Current Process Stage:" handleStateChange={onStageChange} />

            <Button style={{position: 'absolute', bottom: '5%', right: '20%'}} type="outlined" onClick={handleFilterSubmit}>Filter</Button>
        </div>
    )
}

const FilterCard = ({ possibleFilters, title, handleStateChange }) => {

    return (
        <Card variant="outlined" style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', padding: '1em'}}>
            <Typography variant="h6">{title}</Typography>
            {possibleFilters.map((filter, idx) => <CustomSwitch key={idx} name={filter} onChange={(isToggled) => handleStateChange(filter, isToggled)} />)}
        </Card>
    )
}