import {Button, Grid, Typography} from "@material-ui/core";
import Image1 from '../../assets/landing_page_image1.png';
import Image2 from '../../assets/landing_page_image2.png';
import Image3 from '../../assets/landing_page_image3.png';
import {OffersList} from "../offers/list/OffersList";
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {offersAPI} from "../../utils/apis/OfferApi";

export const LandingPage = (props) => {

    const history = useHistory()
    const [offers, setOffers] = useState([])

    useEffect(() => {
        offersAPI.getAllOffers()
            .then(data => setOffers(data || []))
    }, [])

    return(
        <div>
            <div style={{marginLeft: "5%", marginRight:"auto", width: "60%", float: "left"}}>
                <Typography variant="h4">
                    e-Stella - Everything you'll ever need
                </Typography>
                <Grid container style={{marginTop: "2em"}} spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <img src={Image1} alt="Man working in office" style={{width: "100%"}}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <img src={Image2} alt="Couple working in office" style={{width: "48%"}}/>
                            </Grid>
                            <Grid item>
                                <img src={Image3} alt="Woman working in office" style={{width: "48%"}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div style={{width: "25%", float: "left", marginRight: "10%"}}>
                <Typography variant="h6" style={{marginBottom: "1em", textAlign: "right"}}>Latest Offers</Typography>
                <div style={{height: "60vh", overflowY: "hidden"}}>
                    <OffersList onSelectedOffer={(selected) => history.push(`/offers/${selected.id}`)} limit={3} offers={offers}/>
                </div>
                <Button fullWidth variant="outlined" onClick={() => history.push('/offers')}> See more! </Button>
            </div>
        </div>
    )
}