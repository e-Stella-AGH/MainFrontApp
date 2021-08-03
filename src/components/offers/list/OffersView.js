import {OffersList} from "./OffersList";
import {OfferDetails} from "../details/OffersDetails";
import {useEffect, useState} from "react";
import {PickUpOffer} from "./PickUpOffer";
import {Divider, Grid} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {Filter} from "../filter/Filter";
import {offersAPI} from "../../../utils/apis/OfferApi";
import {filterOffers} from "../../../utils/functions";
import PropTypes from "prop-types";
import {SorterWrapper} from "../sorter/SorterWrapper";
import {ColumnAndDetailsLayout} from "../../commons/ColumnAndDetailsLayout";
import {StandardViewAndFilterLayout} from "../../commons/StandardViewAndFilterLayout";

export const OffersView = (props) => {

    const [selectedOffer, setSelectedOffer] = useState(null)
    const [offers, setOffers] = useState([])
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

    return (
        <StandardViewAndFilterLayout
            filter={<Filter offers={offers} onFilterSubmitted={handleFilterSubmitted} fixedOffers={fixedOffers}
                            reloadOffers={handleFilterSubmitted}/>}
            sorter={<SorterWrapper onSort={handleSort}/>}
            view={<ColumnAndDetailsLayout
                details={selectedOffer === null ? <PickUpOffer/> :
                    <OfferDetails offer={selectedOffer} buttons={props.buttons}/>}
                list={<OffersList limit={NaN} onSelectedOffer={(selectedOffer => setSelectedOffer(selectedOffer))}
                                  offers={offers}/>}
            />}
        />
    )
}

OffersView.propTypes = {
    getOffers: PropTypes.func.isRequired,
}
