import {Box, Button, Grid} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import {EStellaSlider} from "../commons/filter/EStellaSlider";
import {useEffect, useState} from "react";
import {filterTypes} from "../../utils/Enums";
import {getFilterValueByType} from "../../utils/functions";
import {EStellaAutocomplete} from '../EStellaAutocomplete'

export const InDrawerFilter = ({items, fixedItems, filters, onFilterSubmitted, toggleDrawer}) => {

    const [sliderValue, setSliderValue] = useState([0, 100])
    const [companyValue, setCompanyValue] = useState("")
    const [positionValue, setPositionValue] = useState("")

    useEffect(() => {
        setSliderValue([
            getFilterValueByType(filters, filterTypes.MIN_SALARY) || getMinOffersSalary(),
            getFilterValueByType(filters, filterTypes.MAX_SALARY) || getMaxOffersSalary()
        ])
    }, [])

    const createFilters = () => {
        return [
            {type: filterTypes.MIN_SALARY, value: sliderValue[0]},
            {type: filterTypes.MAX_SALARY, value: sliderValue[1]},
            {type: filterTypes.COMPANY_NAME, value: companyValue},
            {type: filterTypes.POSITION_NAME, value: positionValue}
        ]
    }

    const calculateWidth = () => {
        const width = window.screen.width
        if (width < 700) {
            return 0.6 * width
        } else {
            return 0.3 * width
        }
    }

    const getMinOffersSalary = () => Math.min(...fixedItems.map(offer => offer.minSalary))
    const getMaxOffersSalary = () => Math.max(...fixedItems.map(offer => offer.maxSalary))

    const handleFilterSubmit = () => {
        toggleDrawer()
        onFilterSubmitted(createFilters())
    }

    const companyOptions = [...new Set(fixedItems.map(offer => offer.organization.name))]
    const positionOptions = [...new Set(fixedItems.map(offer => offer.position))]

    return (
        <div style={{width: `${calculateWidth()}px`, padding: "2em"}}>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <Grid container direction="row">
                        <Grid item xs={10}/>
                        <Grid item xs={2}><Button onClick={toggleDrawer}><CloseIcon
                            fontSize="large"/></Button></Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <EStellaSlider label="Salary" max={getMaxOffersSalary()} min={getMinOffersSalary()} step={100}
                                   value={sliderValue} onValueChanged={(value) => setSliderValue(value)}/>
                </Grid>

                <Grid item>
                    <Box m={1} p={1}>
                        <EStellaAutocomplete options={companyOptions}  label="Company Name" value={companyValue}
                            onChange={(value) => setCompanyValue(value)}
                        />
                    </Box>
                </Grid>

                <Grid item>
                    <Box m={1} p={1}>
                        <EStellaAutocomplete options={positionOptions}  label="Position" value={positionValue}
                                            onChange={(value) => setPositionValue(value)}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} style={{position: "absolute", bottom: "5%", right: "20%"}}>
                    <Grid container direction="row">
                        <Grid item xs={false} md={8} />
                        <Grid item xs={12} md={4}>
                            <Button variant="outlined" onClick={handleFilterSubmit}>
                                Filter
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

InDrawerFilter.propTypes = {
    toggleDrawer: PropTypes.func.isRequired,
    offers: PropTypes.array.isRequired,
    onFilterSubmitted: PropTypes.func.isRequired,
    filters: PropTypes.array, // - state of previous drawer,
    fixedOffers: PropTypes.array.isRequired
}