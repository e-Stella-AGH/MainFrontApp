import PropTypes from 'prop-types';
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";

export const EStellaAutocomplete = ({ options, label, onChange }) => {

    const handleChange = ({ target }) => {
        onChange(target.value)
    }

    return (
        <Autocomplete
            options={options}
            onSelect={handleChange}
            renderInput={(params) => <TextField {...params} variant="outlined" label={label} />}
        />
    )
}

EStellaAutocomplete.propTypes = {
    options: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}