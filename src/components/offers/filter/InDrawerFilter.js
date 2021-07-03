import {Button, Grid} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import {EStellaSlider} from "./EStellaSlider";

export const InDrawerFilter = (props) => {

    const calculateWidth = () => {
        const width = window.screen.width
        if(width < 500) {
            return 0.6 * width
        } else {
            return 0.3 * width
        }
    }

    const offers = props.offers

    const getMinOffersSalary = () => Math.min(...offers.map(offer => offer.minSalary))
    const getMaxOffersSalary = () => Math.max(...offers.map(offer => offer.maxSalary))

    return(
        <div style={{width: `${calculateWidth()}px`, padding: "2em"}}>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <Grid container direction="row">
                        <Grid item xs={10} />
                        <Grid item xs={2}><Button onClick={props.toggleDrawer}><CloseIcon fontSize="large"/></Button></Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <EStellaSlider label="Salary" max={getMaxOffersSalary()} min={getMinOffersSalary()} step={100} />
                </Grid>
            </Grid>
        </div>
    )
}

InDrawerFilter.propTypes = {
    toggleDrawer: PropTypes.func.isRequired,
    offers: PropTypes.array.isRequired
}