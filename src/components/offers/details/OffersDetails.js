import {useHistory} from "react-router-dom";
import {Box, Button, Card, CardContent, Divider, Grid, Typography, useTheme} from "@material-ui/core";
import {OfferSkill} from "./OfferSkill";
import {constants} from "../../../utils/constants";
import PropTypes from "prop-types";


export const OfferDetails = (props) => {

    const history = useHistory()

    const theme = useTheme()

    const offer = props.offer

    return (
        <div>
            <div>
                <Card variant="outlined"
                      style={{width: "90%", marginRight: "auto", marginLeft: "auto", padding: "10px", backgroundColor: theme.palette.card.light,
                          marginBottom: "1em", overflowY: 'scroll', maxHeight: `calc(100vh - 10em - ${constants["navbar_height"]})`}}>
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
                                        {offer.organization?.name}
                                    </Typography>
                                </Box>
                            </div>
                            <div style={{float: "right", marginRight: "20px", display: "flex"}}>
                                {props.buttons.map(button => {
                                    return <Box key={button.text} mr={1} ml={1}>
                                        <Button variant="outlined" onClick={() => button.action(offer, history)} {...button.style}>
                                            <Typography>
                                                {button.text}
                                            </Typography>
                                        </Button>
                                    </Box>
                                })}

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

OfferDetails.propTypes = {
    offer: PropTypes.object.isRequired,
    buttons: PropTypes.array
}

OfferDetails.defaultProps = {
    buttons: [{
        text: "Apply",
        action: (offer, history) => history.push(`/offers/apply/${offer.id}`)
    }]
}
