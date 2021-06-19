import PropTypes from 'prop-types';
import {ShortOfferDetails} from "./ShortOfferDetails";
import {useEffect, useState} from "react";
import {offersAPI} from "../../../utils/OfferApi";
import Swal from "sweetalert2";
import {constants} from "../../../utils/constants";
import { scrollToTop } from '../../../utils/functions';

export const OffersList = (props) => {

    const [selectedIdx, setSelectedIdx] = useState(-1)
    const [offers, setOffers] = useState([])

    useEffect(() => {
        offersAPI.getAllOffers()
            .then(data => setOffers(data))
            .catch(err => {
                Swal.fire({
                    title: "Error",
                    text: "We weren't able to get offers!",
                    icon: "error"
                })
            })
    }, [])

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
        <div style={{marginBottom: "1em"}}>
            {getShortOffers()}
        </div>
    )
}

OffersList.propTypes = {
    limit: PropTypes.number,
    onSelectedOffer: PropTypes.func.isRequired
}

OffersList.defaultProps = {
    limit: 3
}