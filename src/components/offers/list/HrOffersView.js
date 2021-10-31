import {offersAPI} from "../../../utils/apis/OfferApi";
import {hrOfferButtons} from "../HrOfferButtons";
import {theme} from "../../../utils/theme";
import {OffersView} from "./OffersView";
import React from "react";
import {Link} from "react-router-dom";
import {Drawer, List, ListItem} from "@material-ui/core";
import {constants} from "../../../utils/constants";
import {AddCircleOutline} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const marginWithDrawer = "100px"

const HrOffersView = () => <div style={{marginLeft: marginWithDrawer}}>
    <OffersView
        getOffers={() => offersAPI.getOffersFromHr()}
        buttons={hrOfferButtons(theme)}
    />
    <Drawer
        variant="permanent"
        style={{display: "flex", alignItems: "center", width: marginWithDrawer}}
    >
        <List style={{marginTop: `calc(${constants.navbar_height} + 1em)`}}>
            <ListItem>
                <Link to="/hr/offers/add">
                    <IconButton>
                        <AddCircleOutline fontSize="large" color="action"/>
                    </IconButton>
                </Link>
            </ListItem>
        </List>
    </Drawer>
</div>

export default HrOffersView