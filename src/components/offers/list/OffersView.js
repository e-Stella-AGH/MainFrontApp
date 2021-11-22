import {OffersList} from "./OffersList";
import {OfferDetails} from "../details/OffersDetails";
import React, {useEffect, useState} from "react";
import {PickUpOffer} from "./PickUpOffer";
import {Redirect, useParams} from "react-router-dom";
import {Filter} from "../../commons/filter/Filter";
import {offersAPI} from "../../../utils/apis/OfferApi";
import {filterItems} from "../../../utils/functions";
import PropTypes from "prop-types";
import {SorterWrapper} from "../../commons/sorter/SorterWrapper";
import {ColumnAndDetailsLayout} from "../../commons/layouts/ColumnAndDetailsLayout";
import {StandardViewAndFilterLayout} from "../../commons/layouts/StandardViewAndFilterLayout";
import CenteredCircularProgress from "../../commons/CenteredCircularProgress";
import Swal from "sweetalert2";
import { InDrawerFilter } from "../InDrawerFilter";

export const OffersView = (props) => {

    const [selectedOffer, setSelectedOffer] = useState(null)
    const [offers, setOffers] = useState([])
    const [fetchError, setFetchError] = useState(false)
    const [fetching, setFetching] = useState(true)
    const {id} = useParams()
    const [fixedOffers, setFixedOffers] = useState([])
    const [sort, setSort] = useState({apply: (offers) => offers})

    const handleFilterSubmitted = (filters) => {
        setOffers(sort.apply(filterItems(fixedOffers, filters)))
    }

    useEffect(() => {
        if (id !== undefined) {
            offersAPI.getOfferById(id)
                .then(data => setSelectedOffer(data))
                .catch(() => {
                    Swal.fire({
                        title: "Error",
                        text: "We weren't able to get this offer's details!",
                        icon: "error"
                    })
                })
        }
    }, [id])

    useEffect(() => {
        props.getOffers()
            .then(data => {
                setOffers(data || [])
                setFixedOffers(data || [])
                setFetching(false)
            })
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "We weren't able to get offers! You will be redirected to home page",
                    icon: "error"
                }).then(() => {
                    setFetching(false)
                    setFetchError(true)
                })
            })
    }, [props])

    const handleSort = (sort) => {
        /* Probably race problem, don't know how to fix, but works now, if sorting offers doesn't work in future,
        * probably the case
        * Possible solution to race problem - state with sort and offers merged, but I don't like this idea */
        setSort(sort)
        setOffers(offers => ([...sort.apply(offers)]))
    }

    const layoutInternalView = () =>
        selectedOffer ? <OfferDetails offer={selectedOffer} buttons={props.buttons} /> : <PickUpOffer />

    const offersList = () =>
        <OffersList limit={NaN} onSelectedOffer={(selectedOffer => setSelectedOffer(selectedOffer))} offers={offers} />

    return fetchError ? <Redirect to="/" /> : (fetching ? <CenteredCircularProgress size={80} /> : <StandardViewAndFilterLayout
            filter={<Filter
                            onFilterSubmitted={handleFilterSubmitted}
                            reloadItems={handleFilterSubmitted}
                            InDrawerFilter={InDrawerFilter}
                            InDrawerFilterProps={{
                                items: offers,
                                fixedItems: offers
                            }}
                            />}
            sorter={<SorterWrapper onSort={handleSort} />}
            view={<ColumnAndDetailsLayout details={layoutInternalView()} list={offersList()} />}
        />)
}

OffersView.propTypes = {
    getOffers: PropTypes.func.isRequired,
}
