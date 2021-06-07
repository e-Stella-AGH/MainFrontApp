import PropTypes from 'prop-types';
import {ShortOfferDetails} from "./ShortOfferDetails";
import {useState} from "react";

export const OffersList = (props) => {

    const [selectedIdx, setSelectedIdx] = useState(-1)

    const getShortOffers = () => {
        return props.offers.map(
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
    }

    return(
        <div>
            {getShortOffers()}
        </div>
    )
}

OffersList.propTypes = {
    limit: PropTypes.number,
    offers: PropTypes.array.isRequired,
    onSelectedOffer: PropTypes.func.isRequired
}

OffersList.defaultProps = {
    limit: 3
}