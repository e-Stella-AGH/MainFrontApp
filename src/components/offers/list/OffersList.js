import PropTypes from 'prop-types';
import {scrollToTop} from '../../../utils/functions';
import {ListWithSelection} from "../../commons/layouts/ListWithSelection";
import React from "react";
import { Typography, Grid } from '@material-ui/core'

export const OffersList = (props) => {

    const offers = props.offers
    console.log(offers)

    const getData = (offer) => {
        return {
            first: offer.name,
            second: `${offer.minSalary} - ${offer.maxSalary}`,
            third: offer.position,
            offer: offer
        }
    }

    const handleShortOfferSelect = (offer) => {
        if(props.onSelectedOffer) {
            props.onSelectedOffer(offer)
            scrollToTop()
        }
    }

    const getView = () => offers.length > 0 ?
    (<ListWithSelection
        listItems={offers}
        extractData={getData}
        limit={props.limit}
        propsHandleSelect={(offer, idx) => handleShortOfferSelect(offer.offer, idx)}
        isSelectable={!!props.onSelectedOffer}
    />)
    : 
    (<Grid container style={{height: '80vh', border: "1px solid #eee", padding: '2em', width: '100%'}} spacing={2} direction="column">
        <Grid item>
            <img src="https://thumbs.dreamstime.com/b/job-offer-application-letter-response-career-opportunity-business-proposition-recruitment-agreement-man-receives-employment-188064915.jpg"        
                width="80%"
            />
        </Grid>
        <Grid item>
            <Typography variant="h4" style={{marginBottom: '3px'}}>No open offers!</Typography>
            <Typography color="textSecondary"> We're sorry but curently there are no offers that you can apply to. </Typography>
        </Grid>
    </Grid>)


    return getView() 
    
}

OffersList.propTypes = {
    limit: PropTypes.number,
    onSelectedOffer: PropTypes.func,
    offers: PropTypes.array.isRequired
}

OffersList.defaultProps = {
    limit: 3
}