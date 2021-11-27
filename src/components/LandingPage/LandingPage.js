import {Button, Grid, Typography} from "@material-ui/core";
import Image1 from '../../assets/landing_page_image1.png';
import Image2 from '../../assets/landing_page_image2.png';
import Image3 from '../../assets/landing_page_image3.png';
import {OffersList} from "../offers/list/OffersList";
import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {offersAPI} from "../../utils/apis/OfferApi";
import CenteredCircularProgress from "../commons/CenteredCircularProgress";
import {jwtUtils} from "../../utils/jwt/jwtUtils";
import {userTypes} from "../../utils/Enums";
import Swal from "sweetalert2";

const LandingOffers = () => {
    const history = useHistory()
    const [offers, setOffers] = useState(null)

    useEffect(() => {
        offersAPI.getAllOffers(true)
            .then(data => setOffers(data || []))
            .catch(() => {
                Swal.fire({
                    title: "Error",
                    text: "We weren't able to get offers!",
                    icon: "error"
                })
            })
    }, [])

    return offers == null ? <CenteredCircularProgress size={60} /> : <>
        <Typography variant="h6" style={{marginBottom: "1em", textAlign: "right"}}>
            Latest Offers
        </Typography>
        <div style={{height: "60vh", overflowY: "hidden"}}>
            <OffersList onSelectedOffer={(selected) => history.push(`/offers/${selected.id}`)}
                        limit={3}
                        offers={offers}/>
        </div>
        <Button fullWidth variant="outlined" onClick={() => history.push('/offers')}>
            See more!
        </Button>
    </>
}

const LandingHrOffers = () => {
    const history = useHistory()
    const [offers, setOffers] = useState(null)

    useEffect(() => {
        return offersAPI
            .getOffersFromHr()
            .then(data => setOffers(data || []))
            .catch(() =>
                Swal.fire({
                    title: "Error",
                    text: "We weren't able to get offers!",
                    icon: "error"
                })
            )
    }, [])

    return offers == null ? <CenteredCircularProgress size={60} /> : <>
        <Typography variant="h6" style={{marginBottom: "1em", textAlign: "right"}}>
            Your recently created offers
        </Typography>
        <div style={{height: "60vh", overflowY: "hidden"}}>
            <OffersList onSelectedOffer={(selected) => history.push(`/hr/offers/view/${selected.id}`)}
                        limit={3}
                        offers={offers}/>
        </div>
        <Button fullWidth variant="outlined" onClick={() => history.push('/hr/offers')}>
            Go to your offers
        </Button>
    </>
}

const LandingOrganizationOffers = () => {
    const history = useHistory()
    const [offers, setOffers] = useState(null)

    useEffect(() =>
        offersAPI
            .getOffersFromOrganization()
            .then(data => setOffers(data || []))
            .catch(() => Swal.fire({
                title: "Error",
                text: "We weren't able to get offers!",
                icon: "error"
            }))
    , [])

    return offers == null ? <CenteredCircularProgress size={60} /> : <>
        <Typography variant="h6" style={{marginBottom: "1em", textAlign: "right"}}>
            Your recently created offers
        </Typography>
        <div style={{height: "60vh", overflowY: "hidden"}}>
            <OffersList limit={3}
                        offers={offers}/>
        </div>
        <Button fullWidth variant="outlined" onClick={() => history.push('/organization/offers')}>
            Go to organization's offers
        </Button>
    </>
}

const LandingList = () => {
    const userType = jwtUtils.getUser()?.userType

    switch (userType) {
        case userTypes.HR:
            return <LandingHrOffers />
        case userTypes.ORGANIZATION:
            return <LandingOrganizationOffers />
        default:
            return <LandingOffers />
    }
}

export const LandingPage = () => <Grid container spacing={2} style={{width: "90%", margin: "auto"}}>
    <Grid item xs={12} md={8}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <img src="https://imgur.com/5LUwfu8.png" alt="logo" width="30%" style={{marginTop: '-7px'}} />
            <Typography variant="h4">
                Everything you'll ever need
            </Typography>
        </div>
        <Grid container style={{marginTop: "2em"}} spacing={2}>
            <Grid item xs={12} sm={6}>
                <img src={Image1} alt="Man working in office" style={{width: "100%"}}/>
            </Grid>
            <Grid container item xs={12} sm={6} direction="column" spacing={1}>
                <Grid item>
                    <img src={Image2} alt="Couple working in office" style={{width: "48%"}}/>
                </Grid>
                <Grid item>
                    <img src={Image3} alt="Woman working in office" style={{width: "48%"}}/>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    <Grid item xs={12} md={4}>
        <LandingList />
    </Grid>
</Grid>
