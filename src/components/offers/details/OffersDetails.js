import {useHistory} from "react-router-dom";
import {Box, Button, CardContent, Divider, Grid, Typography} from "@material-ui/core";
import {OfferSkill} from "./OfferSkill";
import PropTypes from "prop-types";
import {ListElementDetails} from "../../commons/layouts/ListElementDetails";
import {SingleMenu} from './SingleMenu.js'
import {jwtUtils} from "../../../utils/jwt/jwtUtils";

export const OfferDetails = (props) => {

    const history = useHistory()

    const offer = props.offer

    const groups = (buttons) => buttons.reduce((groups, item) => {
        const group = (groups[item.menu] || []);
        group.push(item);
        groups[item.menu] = group;
        return groups;
      }, {});

    const getButtons = () => {
        const user = jwtUtils.getUser()

        if (user?.userType === "hr" || user?.userType === "organization") {
            return (<div style={{float: "right", marginRight: "20px", display: "flex", flexWrap: "wrap"}}>
                        {
                        Object.entries(groups(props.buttons)).map(([menu, buttons]) => {
                            return <Box key={menu} mr={1} ml={1}>
                                <SingleMenu menuName={menu} buttons={buttons} offer={offer} history={history} />
                            </Box>
                            })
                        }
                    </div>)
        }

        return (<div style={{float: "right", marginRight: "20px", display: "flex", flexWrap: "wrap"}}>
            {props.buttons.map(button => {
            return <Box key={button.text} mr={1} ml={1}>
                <Button variant="outlined" onClick={() => button.action(offer, history)} {...button.style}>
                    <Typography>
                        {button.text}
                    </Typography>
                </Button>
            </Box>})}
            </div>
        )
    }

    const getCardContent = () => {
        return (<CardContent>
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
                {getButtons()}
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
                        <Grid key={idx} item><OfferSkill key={idx}
                                                         name={skill.name}
                                                         skillLevel={skill.level}/></Grid>)}
                </Grid>
            </Box>
            <Divider/>
            <Box m={2} p={2}>
                {offer.description}
            </Box>
        </CardContent>)
    }

    return (
        <ListElementDetails cardContent={getCardContent()}/>
    )
}

OfferDetails.propTypes = {
    offer: PropTypes.object.isRequired,
    buttons: PropTypes.array
}

OfferDetails.defaultProps = {
    buttons: [{
        text: "Apply",
        action: (offer, history) => history.push(`/offers/apply/${offer.id}`),
        menu: "Apply menu",
        style: {color: 'primary', variant: 'contained'}
    }]
}
