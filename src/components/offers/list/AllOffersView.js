import {OffersList} from "./OffersList";
import {OfferDetails} from "../details/OffersDetails";
import {useEffect, useState} from "react";
import {PickUpOffer} from "./PickUpOffer";
import {Grid} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {offersAPI} from "../../../utils/OfferApi";

export const AllOffersView = (props) => {

    const [selectedOffer, setSelectedOffer] = useState(null)
    const { id } = useParams()
    //const [filter, setFilter] = useState([])

    useEffect(() => {
        if(id !== undefined){
            offersAPI.getOfferById(id)
                .then(data => setSelectedOffer(data))
        }
    }, [id])

    return(
        <div>
            <Grid container>
                <Grid item xs={12} sm={6} lg={8}>
                    { selectedOffer === null ? <PickUpOffer /> : <OfferDetails offer={selectedOffer} />}
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <OffersList limit={NaN} onSelectedOffer={(selectedOffer => setSelectedOffer(selectedOffer))} />
                </Grid>
            </Grid>
        </div>
    )
}