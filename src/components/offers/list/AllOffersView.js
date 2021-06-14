import {Grid} from "@material-ui/core";
import {OffersList} from "./OffersList";
import {OfferDetails} from "../details/OffersDetails";
import {useState} from "react";
import {PickUpOffer} from "./PickUpOffer";

export const AllOffersView = (props) => {

    const [selectedOffer, setSelectedOffer] = useState(null)
    //const [filter, setFilter] = useState([])

    return(
        <div>
            <Grid container>
                <Grid item xs={12} sm={8} md={9}>
                    { selectedOffer === null ? <PickUpOffer /> : <OfferDetails offer={selectedOffer} />}
                </Grid>
                <Grid item xs={12} sm={4}  md={3}>
                    <OffersList limit={false} onSelectedOffer={(selectedOffer => setSelectedOffer(selectedOffer))} />
                </Grid>
            </Grid>
        </div>
    )
}