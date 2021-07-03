import PropTypes from 'prop-types';
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";

export const AutocompleteFilter = (props) => {

    const handleChange = ({ target }) => {
        props.onChange(target.value)
    }

    return (
        <Autocomplete
            options={props.options}
            onSelect={handleChange}
            renderInput={(params) => <TextField {...params} variant="outlined" label={props.label} />}
        />
    )
}

AutocompleteFilter.propTypes = {
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}