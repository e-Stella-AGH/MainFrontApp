import {Avatar, Chip, Grid} from "@material-ui/core";
import PropTypes from "prop-types";
import {getIconFromFilterType} from "../../../utils/functions";
import {ProcessStage} from '../../../utils/procesStages'

export const ActiveFilter = ({ label, handleDelete, filter, color }) => {

    const getLabel = () => label.split(' ').at(-1) in ProcessStage ? `${filter.type}: ${ProcessStage[label.split(' ').at(-1)].name}` : label

    return (
        <Grid item>
            <Chip label={getLabel()} onDelete={handleDelete} color={color} avatar={<Avatar id={`${label}-avatar`}>
                {getIconFromFilterType(filter)}
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