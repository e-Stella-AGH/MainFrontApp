import {OffersList} from "./OffersList";
import {OfferDetails} from "../details/OffersDetails";
import {useState} from "react";
import {PickUpOffer} from "./PickUpOffer";
import {Grid} from "@material-ui/core";

export const AllOffersView = (props) => {

    const [selectedOffer, setSelectedOffer] = useState(null)
    //const [filter, setFilter] = useState([])

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