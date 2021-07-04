import {Avatar, Chip, Grid} from "@material-ui/core";
import PropTypes from "prop-types";
import {getIconFromFilterType} from "../../../utils/functions";


export const ActiveFilter = (props) => {

    return (
        <Grid item>
            <Chip label={props.label} onDelete={props.handleDelete} color={props.color} avatar={<Avatar>
                {getIconFromFilterType(props.filter)}
            </Avatar>} />
        </Grid>
    )
}

ActiveFilter.propTypes = {
    label: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    flter: PropTypes.object.isRequired
}

ActiveFilter.defaultProps = {
    color: "primary"
}