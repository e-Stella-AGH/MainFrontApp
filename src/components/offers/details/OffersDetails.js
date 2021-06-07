import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Box, Button, Card, CardContent, Divider, Grid, Typography} from "@material-ui/core";
import {OfferSkill} from "./OfferSkill";

export const OfferDetails = (props) => {

    const history = useHistory()

    const [offer, setOffer] = useState({skills: []})

    useEffect(() => {
        setOffer(props.offer)
    }, [props.offer])

    const apply = () => {
        history.push(`/offers/apply/${offer.id}`)
    }

    return (
        <div>
            <div>
                <Card variant="outlined"
                      style={{width: "90%", marginRight: "auto", marginLeft: "auto", padding: "10px"}}>
                    <CardContent>
                        <Box mb={12}>
                            <div style={{float: "left"}}>
                                <Box>
                                    <Typography variant="h4" component="h2">
                                        {offer.name}
                                    </Typography>
                                </Box>
                                <Box m={1}>
                                    <Typography variant="h6" color="textSecondary">
                                        {offer.company}
                                    </Typography>
                                </Box>
                            </div>
                            <div style={{float: "right", marginRight: "20px", marginTop: "-8px"}}>
                                <Button variant="outlined" onClick={apply}>
                                    <Typography variant="h6">
                                        Apply
                                    </Typography>
                                </Button>
                            </div>
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
                                    <div>
                                        <Typography variant="h6">
                                            {offer.minSalary} - {offer.maxSalary}
                                        </Typography>
                                    </div>
                                    <div style={{float: 'right'}}>
                                        <Typography variant="h6" color="textSecondary">
                                            {offer.localization}
                                        </Typography>
                                    </div>
                                </div>
                            </Box>
                        </Box>
                        <Box mt={8} mb={4}>
                            <Grid container>
                                {offer.skills.map((skill, idx) =>
                                    <Grid key={idx} item ><OfferSkill key={idx}
                                          name={skill.name}
                                          skillLevel={skill.level}/></Grid>)}
                            </Grid>
                        </Box>
                        <Divider/>
                        <Box m={2} p={2}>
                            {offer.description}
                        </Box>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}