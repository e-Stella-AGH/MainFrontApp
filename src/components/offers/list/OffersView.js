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

export const OffersView = (props) => {

    const [selectedOffer, setSelectedOffer] = useState(null)
    const [offers, setOffers] = useState([])
    const {id} = useParams()
    const [fixedOffers, setFixedOffers] = useState([])

    const handleFilterSubmitted = (filters) => {
        setOffers(filterOffers(fixedOffers, filters))
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
    }, [])

    return (
        <div>
            <div style={{marginBottom: "10px"}}>
                <Filter offers={offers} onFilterSubmitted={handleFilterSubmitted} fixedOffers={fixedOffers} reloadOffers={handleFilterSubmitted}/>
            </div>
            <Divider/>
            <div style={{marginTop: "15px"}}>
                <Grid container>
                    <Grid item xs={12} sm={6} lg={8}>
                        {selectedOffer === null ? <PickUpOffer/> : <OfferDetails offer={selectedOffer} buttons={props.buttons}/>}
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <OffersList limit={NaN} onSelectedOffer={(selectedOffer => setSelectedOffer(selectedOffer))}
                                    offers={offers}/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

OffersView.propTypes = {
    getOffers: PropTypes.func.isRequired,
}
