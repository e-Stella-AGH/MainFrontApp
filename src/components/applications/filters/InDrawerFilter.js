import { useState } from 'react'
import { filterTypes, operators } from '../../../utils/Enums'
import {CustomSwitch} from './CustomSwitch'
import { Button, Divider, Card, Typography, Grid } from '@material-ui/core'
import { EStellaAutocomplete } from '../../EStellaAutocomplete'
import { TagsList } from '../../notes/TagsList'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export const ApplicationsInDrawerFilter = ({ items, fixedItems, filters, onFilterSubmitted, toggleDrawer }) => {

    const possibleStages = [...new Set(fixedItems.map(item => item.stage.type))]
    const statuses = [...new Set(fixedItems.map(item => item.status))]
    const tags = fixedItems.reduce((acc, item) => [...acc, ...item.tags], [])

    const [toggledStages, setToggledStages] = useState([])
    const [toggledApplicationStatuses, setToggledApplicationStatuses] = useState([])
    const [tagsOptions, setTagsOptions] = useState({ tags: [], operator: operators.AND })

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

    const onTagAdd = (tag) => tag && setTagsOptions({...tagsOptions, tags: [...new Set([...tagsOptions.tags, tag])]})
    const onTagDelete = (tag) => setTagsOptions({...tagsOptions, tags: tagsOptions.tags.filter(innerTag => innerTag !== tag)})
    const onOperatorChange = (operator) => setTagsOptions({...tagsOptions, operator: operator.target.value})

    const createFilters = () => [
        {type: filterTypes.PROCESS_STAGE, value: toggledStages},
        {type: filterTypes.APPLICATION_STAGE, value: toggledApplicationStatuses},
        {type: filterTypes.TAGS, value: tagsOptions.tags, operator: tagsOptions.operator}
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
        <div style={{width: `${calculateWidth()}px`, padding: "2em", marginTop: '1em'}}>

            <TagsFilter tags={tags} onTagAdd={onTagAdd} onRemoveTag={onTagDelete} onOperatorChange={onOperatorChange} currentTags={tagsOptions.tags} value={tagsOptions.operator} />

            <FilterCard possibleFilters={statuses} title="Current Application Status:" handleStateChange={onApplicationStatusChange} />

            <FilterCard possibleFilters={possibleStages} title="Current Process Stage:" handleStateChange={onStageChange} />

            <Button style={{position: 'absolute', bottom: '5%', right: '20%'}} type="outlined" onClick={handleFilterSubmit}>Filter</Button>
        </div>
    )
}

const FilterCard = ({ possibleFilters, title, handleStateChange }) => {

    return (
        <Card variant="outlined" style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', padding: '1em', margin: '2em 0'}}>
            <Typography variant="h6">{title}</Typography>
            {possibleFilters.map((filter, idx) => <CustomSwitch key={idx} name={filter} onChange={(isToggled) => handleStateChange(filter, isToggled)} />)}
        </Card>
    )
}

const TagsFilter = ({ tags, onTagAdd, onRemoveTag, onOperatorChange, value, currentTags=[] }) => {

    return (
        <Card variant="outlined" style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', padding: '1em', margin: '2em 0'}}>
            <Typography variant="h6" style={{marginBottom: '1em'}}>Tags:</Typography>
            <Grid container direction="row" spacing={2} style={{marginBottom: '1em'}}>
                <Grid sm={7}>
                    <EStellaAutocomplete
                        options={tags}
                        onChange={onTagAdd}
                        label="Tags"
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid sm={4}>
                    <RadioButtons onOperatorChange={onOperatorChange} value={value} />
                </Grid>
            </Grid>
            <TagsList
                tags={currentTags}
                deletable
                onDelete={onRemoveTag}
            />
        </Card>
    )
}

const RadioButtons = ({ onOperatorChange, value }) => {

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Operators</FormLabel>
            <RadioGroup value={value} onChange={onOperatorChange} style={{display: 'flex', flexDirection: 'row'}}>
                <FormControlLabel value={operators.AND} control={<Radio />} label="And" />
                <FormControlLabel value={operators.OR} control={<Radio />} label="Or" />
            </RadioGroup>
        </FormControl>
    )
}