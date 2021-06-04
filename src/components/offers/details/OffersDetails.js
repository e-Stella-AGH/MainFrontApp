import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {offersAPI} from "../../../utils/OfferApi";
import {Box, Card, CardContent, Divider, Grid, Typography} from "@material-ui/core";
import {OfferSkill} from "./OfferSkill";

export const OfferDetails = (props) => {

    const {id} = useParams()

    const [offer, setOffer] = useState({skills: []})

    useEffect(() => {
        offersAPI.getOfferById(id)
            .then(data => setOffer(data))
    }, [id])

    return (
        <Card variant="outlined" style={{width: "80%", marginRight: "auto", marginLeft: "auto"}}>
            <CardContent>
                <Box mb={1}>
                    <Typography variant="h4" component="h2">
                        {offer.name}
                    </Typography>
                </Box>
                <Divider/>
                <Box mt={1}>
                    <Typography variant="h6" color="textSecondary">
                        {offer.position}
                    </Typography>
                </Box>
                <Grid container>
                    {offer.skills.map((skill, idx) =>
                        <Grid key={idx} item xs={12} sm={6} md={4} lg={3}><OfferSkill key={idx} name={skill.name} skillLevel={skill.level}/></Grid>)}
                </Grid>
            </CardContent>
        </Card>
    )
}