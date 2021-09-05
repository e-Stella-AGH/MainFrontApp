import {Grid} from "@material-ui/core";
import PropTypes from "prop-types";

export const ColumnAndDetailsLayout = ({details, list}) => {

    return (
        <div style={{marginTop: "15px"}}>
            <Grid container>
                <Grid item xs={12} sm={8}>
                    {details}
                </Grid>
                <Grid item xs={12} sm={4}>
                    {list}
                </Grid>
            </Grid>
        </div>
    )
}

ColumnAndDetailsLayout.propTypes = {
    details: PropTypes.any.isRequired,  //component representing details of list item
    list: PropTypes.any.isRequired      //component representing list of items
}