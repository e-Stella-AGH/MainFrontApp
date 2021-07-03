import {OffersList} from "./OffersList";
import {OfferDetails} from "../details/OffersDetails";
import {useEffect, useState} from "react";
import {PickUpOffer} from "./PickUpOffer";
import {Divider, Grid} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {Filter} from "../filter/Filter";
import {offersAPI} from "../../../utils/apis/OfferApi";
import {createFilterFunction} from "../../../utils/functions";

export const AllOffersView = (props) => {

    const [selectedOffer, setSelectedOffer] = useState(null)
    const [offers, setOffers] = useState([])
    const {id} = useParams()
    //const [filter, setFilter] = useState([])

    const handleFilterSubmitted = (filters) => {
        let tmpOffers = offers
        filters.forEach(filter => {
            tmpOffers = tmpOffers.filter(offer => (createFilterFunction(filter))(offer))
        })
        setOffers(tmpOffers)
    }

    useEffect(() => {
        if (id !== undefined) {
            offersAPI.getOfferById(id)
                .then(data => setSelectedOffer(data))
        }
    }, [id])

    useEffect(() => {
        offersAPI.getAllOffers()
            .then(data => setOffers(data || []))
    }, [])

    return (
        <div>
            <div style={{marginBottom: "10px"}}>
                <Filter offers={offers} onFilterSubmitted={handleFilterSubmitted}/>
            </div>
            <Divider/>
            <div style={{marginTop: "15px"}}>
                <Grid container>
                    <Grid item xs={12} sm={6} lg={8}>
                        {selectedOffer === null ? <PickUpOffer/> : <OfferDetails offer={selectedOffer}/>}
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