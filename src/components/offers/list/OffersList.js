import PropTypes from 'prop-types';
import {ShortOfferDetails} from "./ShortOfferDetails";
import {useState} from "react";
import {constants} from "../../../utils/constants";
import {scrollToTop} from '../../../utils/functions';

export const OffersList = (props) => {

    const [selectedIdx, setSelectedIdx] = useState(-1)

    const offers = props.offers

    const getShortOffers = () => {
        return offers
            .filter((item, idx) => props.limit ? idx < props.limit : true)
            .map(
                (offer, idx) => {
                    return selectedIdx === idx ?
                        <ShortOfferDetails selected offer={offer} key={idx}
                                           onClick={(offer, idx) => handleShortOfferSelect(offer, idx)} idx={idx}/>
                        : <ShortOfferDetails offer={offer} key={idx}
                                             onClick={(offer, idx) => handleShortOfferSelect(offer, idx)} idx={idx}/>
                }
            )
    }

    const handleShortOfferSelect = (offer, idx) => {
        props.onSelectedOffer(offer)
        setSelectedIdx(idx)
        scrollToTop()
    }

    return(
        <div style={{overflowY: 'scroll', height: `calc(100vh - 7em - ${constants["navbar_height"]})`}}>
            {getShortOffers()}
        </div>
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