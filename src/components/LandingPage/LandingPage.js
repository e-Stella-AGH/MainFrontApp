import {Grid, Typography} from "@material-ui/core";
import Image1 from '../../assets/landing_page_image1.png';
import Image2 from '../../assets/landing_page_image2.png';
import Image3 from '../../assets/landing_page_image3.png';

export const LandingPage = (props) => {

    return(
        <div style={{marginLeft: "auto", marginRight:"auto", width: "80%"}}>
            <Typography variant="h4">
                e-Stella - Everything you'll ever need for recruitment.
            </Typography>
            <Grid container style={{marginTop: "2em"}} spacing={2}>
                <Grid item xs={12} sm={6}>
                    <img src={Image1} alt="Man working in office" style={{width: "100%"}}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <img src={Image2} alt="Couple working in office" style={{width: "47%", marginLeft: "1%"}}/>
                        </Grid>
                        <Grid item>
                            <img src={Image3} alt="Woman working in office" style={{width: "48%"}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}