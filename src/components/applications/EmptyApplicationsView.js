import Image from '../../assets/empty_view.png'
import {Box, Button, Grid, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

<<<<<<< HEAD
export const EmptyApplicationsView = ({isHR, isDev}) => {
=======
export const EmptyApplicationsView = ({isHR}) => {
>>>>>>> c40b8f71775e5d0779e41986e4331bcbb51ac488

    const history = useHistory()

    const handleApply = () => {
        history.push('/offers')
    }

    const handleBackToOffers = () => {
        history.push('/hr/offers')
    }

    return (
        <Box m={4}>
            <Grid container spacing={2} direction="row" alignItems="center">
                <Grid item xs={12} sm={5}>
                    <img src={Image} alt="Person looking for something" width="100%"/>
                </Grid>
                <Grid item xs={false} sm={2}/>
                <Grid item xs={12} sm={5}>
                    <Grid container spacing={6}>
                        <Grid item>
                            <Typography variant="h4" color="textPrimary">
                                Oops... We couldn't find
                                any {isHR ? "" : "of your"} applications {isHR ? "on this offer" : ""}!
                            </Typography>
                        </Grid>
                        <Grid item>
                            {
<<<<<<< HEAD
                                !isDev &&
=======
>>>>>>> c40b8f71775e5d0779e41986e4331bcbb51ac488
                                isHR ? <Button variant="contained" color="primary" onClick={handleBackToOffers}>
                                        <Typography variant="h6"> Back to my offers </Typography>
                                    </Button>
                                    : <Button variant="contained" color="primary" onClick={handleApply}>
                                        <Typography variant="h6"> Apply right now! </Typography>
                                    </Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}