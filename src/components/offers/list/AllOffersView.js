import {Grid} from "@material-ui/core";
import {OffersList} from "./OffersList";
import {OfferDetails} from "../details/OffersDetails";
import {useState, useEffect} from "react";
import {PickUpOffer} from "./PickUpOffer";
import {offersAPI} from "../../../utils/OfferApi";
import Swal from "sweetalert2";

export const AllOffersView = (props) => {

    const [selectedOffer, setSelectedOffer] = useState(null)
    const [offers, setOffers] = useState([])
    //const [filter, setFilter] = useState([])

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

    return(
        <div>
            <Grid container>
                <Grid item xs={12} sm={6} md={9}>
                    { selectedOffer === null ? <PickUpOffer /> : <OfferDetails offer={selectedOffer} />}
                </Grid>
                <Grid item xs={12} sm={6}  md={3}>
                    <OffersList offers={offers} onSelectedOffer={(selectedOffer => setSelectedOffer(selectedOffer))} />
                </Grid>
            </Grid>
        </div>
    )
}