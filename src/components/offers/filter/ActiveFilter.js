import {Avatar, Chip, Grid} from "@material-ui/core";
import PropTypes from "prop-types";
import {getIconFromFilterType} from "../../../utils/functions";

export const ActiveFilter = (props) => {

    return (
        <Grid item>
            <Chip label={props.label} onDelete={props.handleDelete} color={props.color} avatar={<Avatar id={`${props.label}-avatar`}>
                {getIconFromFilterType(props.filter)}
            </Avatar>} />
        </Grid>
    )
}

ActiveFilter.propTypes = {
    label: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    filter: PropTypes.object.isRequired
}

ActiveFilter.defaultProps = {
    color: "primary"
}