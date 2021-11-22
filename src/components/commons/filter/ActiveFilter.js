import {Avatar, Chip, Grid} from "@material-ui/core";
import PropTypes from "prop-types";
import {getIconFromFilterType} from "../../../utils/functions";
import {ProcessStage} from '../../../utils/procesStages'

export const ActiveFilter = ({ label, handleDelete, filter, color }) => {

    const lastLabelWord = label.split(' ')[label.split(' ').length - 1]

    const getLabel = () => lastLabelWord in ProcessStage ? `${filter.type}: ${ProcessStage[lastLabelWord].name}` : label

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