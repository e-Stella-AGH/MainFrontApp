import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {offersAPI} from "../../../utils/OfferApi";
import {Box, Button, Card, CardContent, Divider, Grid, GridList, Typography} from "@material-ui/core";
import {OfferSkill} from "./OfferSkill";
import Swal from 'sweetalert2';

export const OfferDetails = (props) => {

    const {id} = useParams()

    const [offer, setOffer] = useState({skills: []})

    useEffect(() => {
        offersAPI.getOfferById(id)
            .then(data => setOffer(data))
    }, [id])

    const apply = () => {
        let swal = new Swal({
            title: "Applying..."
        })
        Swal.showLoading()
        offersAPI.apply(id)
            .then(() => {
                swal.close()
                Swal.fire({
                   title: "Success",
                   text: "You've successfully applied to this offer!",
                   icon: "success"
                })
            })
            .catch((err) => {
                swal.close()
                Swal.fire({
                    title: err,
                    text: "We couldn't apply you on this offer",
                    icon: "error",
                    confirmButtonText: "ok"
                })
            })

    }

    return (
        <Card variant="outlined" style={{width: "90%", marginRight: "auto", marginLeft: "auto", padding: "10px"}}>
            <CardContent>
                <Box mb={12} >
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
                            <Grid key={idx} item xs={12} sm={6} md={4} lg={3}><OfferSkill key={idx} name={skill.name} skillLevel={skill.level}/></Grid>)}
                    </Grid>
                </Box>
                <Divider />
                <Box m={2} p={2}>
                    {offer.description}
                </Box>
            </CardContent>
        </Card>
    )
}