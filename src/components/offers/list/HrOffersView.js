import {offersAPI} from "../../../utils/apis/OfferApi";
import {hrOfferButtons} from "../HrOfferButtons";
import {theme} from "../../../test/utils/theme";
import {OffersView} from "./OffersView";
import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

const HrOffersView = () => <div style={{width: "90%", marginRight: "auto", marginLeft: "auto"}}>
    <Link to="/hr/offers/add">
        <Button variant="contained" color="primary" style={{marginBottom: "1em"}}>Add new offer</Button>
    </Link>
    <OffersView
        getOffers={() => offersAPI.getOffersFromHr()}
        buttons={hrOfferButtons(theme)}
    />
</div>

export default HrOffersView