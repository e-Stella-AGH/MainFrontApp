import FilterListIcon from '@material-ui/icons/FilterList';
import {Button, Drawer} from "@material-ui/core";
import {useState} from "react";
import {InDrawerFilter} from "./InDrawerFilter";
import PropTypes from "prop-types";

export const Filter = (props) => {

    const [open, setOpen] = useState(false)
    const [filters, setFilters] = useState([])

    const handleFilterSubmitted = (filters) => {
        setFilters(filters)
        props.onFilterSubmitted(filters)
    }

    const toggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <div>
            <Button onClick={() => toggleDrawer()}><FilterListIcon fontSize="large"/></Button>

            <Drawer anchor="left" open={open} ModalProps={{onBackdropClick: () => toggleDrawer()}}
                    transitionDuration={700}>
                <InDrawerFilter toggleDrawer={toggleDrawer} offers={props.offers}
                                onFilterSubmitted={handleFilterSubmitted} filters={filters}/>
            </Drawer>

        </div>
    )
}

Filter.propTypes = {
    offers: PropTypes.array.isRequired,
    onFilterSubmitted: PropTypes.func.isRequired
}