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
        <Card variant="outlined" style={{width: "90%", marginRight: "auto", marginLeft: "auto", padding: "10px"}}>
            <CardContent>
                <Box mb={1}>
                    <Typography variant="h4" component="h2">
                        {offer.name}
                    </Typography>
                </Box>
                <Divider/>
                <Box style={{width: "100%"}}>
                    <Box mt={1}>
                        <div style={{float: "left"}}>
                            <Typography variant="h5" color="textSecondary">
                                {offer.position}
                            </Typography>
                        </div>
                    </Box>
                    <Box>
                        <div style={{float: "right", marginRight: "20px"}}>
                            <Typography variant="h6">
                                {offer.minSalary} - {offer.maxSalary}
                            </Typography>
                        </div>
                    </Box>
                </Box>
                <Box mt={8}>
                    <Grid container>
                        {offer.skills.map((skill, idx) =>
                            <Grid key={idx} item xs={12} sm={6} md={4} lg={3}><OfferSkill key={idx} name={skill.name} skillLevel={skill.level}/></Grid>)}
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}