import PropTypes from 'prop-types';
import {useState} from "react";
import {scrollToTop} from '../../../utils/functions';
import {ListWithSelection} from "../../commons/ListWithSelection";

export const OffersList = (props) => {

    const offers = props.offers

    const getData = (offer) => {
        return {
            first: offer.name,
            second: `${offer.minSalary} - ${offer.maxSalary}`,
            third: offer.position,
            offer: offer
        }
    }

    const handleShortOfferSelect = (offer, idx) => {
        props.onSelectedOffer(offer)
        scrollToTop()
    }

    return (
        <ListWithSelection
            listItems={offers}
            extractData={getData}
            limit={props.limit}
            propsHandleSelect={(offer, idx) => handleShortOfferSelect(offer.offer, idx)}
        />
    )
}

OffersList.propTypes = {
    limit: PropTypes.number,
    onSelectedOffer: PropTypes.func.isRequired,
    offers: PropTypes.array.isRequired
}

OffersList.defaultProps = {
    limit: 3
}