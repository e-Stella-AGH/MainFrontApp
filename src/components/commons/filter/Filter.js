import FilterListIcon from '@material-ui/icons/FilterList';
import {Button, Drawer, Grid} from "@material-ui/core";
import React, {useState} from "react";
import PropTypes from "prop-types";
import {ActiveFilter} from "./ActiveFilter";

export const Filter = ({ onFilterSubmitted, reloadItems, InDrawerFilter, InDrawerFilterProps }) => {

    const [open, setOpen] = useState(false)
    const [filters, setFilters] = useState([])

    const handleFilterSubmitted = (filters) => {
        setFilters(filters)
        onFilterSubmitted(filters)
    }

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const getFiltersAsActiveFilters = () => {
        return filters.map(filter => filter.value ? <Grid item key={filter.type}><ActiveFilter
            handleDelete={() => handleFilterDelete(filter.type)}
            label={`${filter.type}: ${filter.value}`}
            filter={filter}/></Grid> : null)
    }

    const handleFilterDelete = (filterType) => {
        const newFilters = filters.filter(filter => filter.type !== filterType)
        setFilters(newFilters)
        reloadItems(newFilters)
    }

    return (
        <div>
            <Grid container direction="row" spacing={3}>
                <Grid item>
                    <Button onClick={() => toggleDrawer()}><FilterListIcon fontSize="large"/></Button>
                </Grid>
                {getFiltersAsActiveFilters()}
            </Grid>

            <Drawer anchor="left" open={open} ModalProps={{onBackdropClick: () => toggleDrawer()}}
                    transitionDuration={700}>
                <InDrawerFilter {...InDrawerFilterProps} onFilterSubmitted={handleFilterSubmitted} filters={filters} toggleDrawer={toggleDrawer}/>
            </Drawer>

        </div>
    )
}

Filter.propTypes = {
    offers: PropTypes.array.isRequired,
    onFilterSubmitted: PropTypes.func.isRequired,
    fixedOffers: PropTypes.array.isRequired,
    reloadOffers: PropTypes.func.isRequired
}

