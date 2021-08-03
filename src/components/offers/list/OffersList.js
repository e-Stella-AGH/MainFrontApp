import PropTypes from 'prop-types';
import {useState} from "react";
import {constants} from "../../../utils/constants";
import {scrollToTop} from '../../../utils/functions';
import {ListElement} from "../../commons/ListElement";

export const OffersList = (props) => {

    const [selectedIdx, setSelectedIdx] = useState(-1)

    const offers = props.offers

    const getData = (offer) => {
        return {
            first: offer.name,
            second: `${offer.minSalary} - ${offer.maxSalary}`,
            third: offer.position,
            offer: offer
        }
    }

    const getShortOffers = () => {
        return offers
            .filter((item, idx) => props.limit ? idx < props.limit : true)
            .map(
                (offer, idx) => {
                    return selectedIdx === idx ?
                        <ListElement key={idx} idx={idx} onClick={(offer, idx) => handleShortOfferSelect(offer.offer, idx)}
                                     selected data={getData(offer)}/>
                        : <ListElement idx={idx} onClick={(offer, idx) => handleShortOfferSelect(offer.offer, idx)}
                                       key={idx} data={getData(offer)} selected={false}/>
                }
            )
    }

    const handleShortOfferSelect = (offer, idx) => {
        props.onSelectedOffer(offer)
        setSelectedIdx(idx)
        scrollToTop()
    }

    return (
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