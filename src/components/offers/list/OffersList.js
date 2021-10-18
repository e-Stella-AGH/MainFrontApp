import PropTypes from 'prop-types';
import {scrollToTop} from '../../../utils/functions';
import {ListWithSelection} from "../../commons/layouts/ListWithSelection";
import React from "react";

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

    const handleShortOfferSelect = (offer) => {
        if(props.onSelectedOffer) {
            props.onSelectedOffer(offer)
            scrollToTop()
        }
    }

    return (
        <ListWithSelection
            listItems={offers}
            extractData={getData}
            limit={props.limit}
            propsHandleSelect={(offer, idx) => handleShortOfferSelect(offer.offer, idx)}
            isSelectable={!!props.onSelectedOffer}
        />
    )
}

OffersList.propTypes = {
    limit: PropTypes.number,
    onSelectedOffer: PropTypes.func,
    offers: PropTypes.array.isRequired
}

OffersList.defaultProps = {
    limit: 3
}