import {OffersList} from "./OffersList";
import {OfferDetails} from "../details/OffersDetails";
import React, {useEffect, useState} from "react";
import {PickUpOffer} from "./PickUpOffer";
import {useParams} from "react-router-dom";
import {Filter} from "../filter/Filter";
import {offersAPI} from "../../../utils/apis/OfferApi";
import {filterOffers} from "../../../utils/functions";
import PropTypes from "prop-types";
import {SorterWrapper} from "../sorter/SorterWrapper";
import {ColumnAndDetailsLayout} from "../../commons/layouts/ColumnAndDetailsLayout";
import {StandardViewAndFilterLayout} from "../../commons/layouts/StandardViewAndFilterLayout";
import CenteredCircularProgress from "../../commons/CenteredCircularProgress";

export const OffersView = (props) => {

    const [selectedOffer, setSelectedOffer] = useState(null)
    const [offers, setOffers] = useState(null)
    const {id} = useParams()
    const [fixedOffers, setFixedOffers] = useState([])
    const [sort, setSort] = useState({apply: (offers) => offers})

    const handleFilterSubmitted = (filters) => {
        setOffers(sort.apply(filterOffers(fixedOffers, filters)))
    }

    useEffect(() => {
        if (id !== undefined) {
            offersAPI.getOfferById(id)
                .then(data => setSelectedOffer(data))
        }
    }, [id])

    useEffect(() => {
        props.getOffers()
            .then(data => {
                setOffers(data || [])
                setFixedOffers(data || [])
            })
    }, [props])

    const handleSort = (sort) => {
        /* Probably race problem, don't know how to fix, but works now, if sorting offers doesn't work in future,
        * probably the case
        * Possible solution to race problem - state with sort and offers merged, but I don't like this idea */
        setSort(sort)
        setOffers(offers => ([...sort.apply(offers)]))
    }

    const layoutInternalView = selectedOffer ? <OfferDetails offer={selectedOffer} buttons={props.buttons} /> : <PickUpOffer />
    const offersList = <OffersList limit={NaN} onSelectedOffer={(selectedOffer => setSelectedOffer(selectedOffer))} offers={offers} />

    return offers == null ? <CenteredCircularProgress size={80} /> : <StandardViewAndFilterLayout
            filter={<Filter offers={offers}
                            onFilterSubmitted={handleFilterSubmitted}
                            fixedOffers={fixedOffers}
                            reloadOffers={handleFilterSubmitted} />}
            sorter={<SorterWrapper onSort={handleSort} />}
            view={<ColumnAndDetailsLayout details={layoutInternalView} list={offersList} />}
        />
}

OffersView.propTypes = {
    getOffers: PropTypes.func.isRequired,
}
