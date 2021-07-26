import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from 'prop-types';

export const EStellaDatePicker = ({ divStyle, additionalProps, selectedDate, handleDateChange }) => {

    return (
        <div style={{...divStyle}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    format="dd/MM/yyyy"
                    margin="normal"
                    value={selectedDate}
                    label="End of recruitment process"
                    onChange={handleDateChange}
                    {...additionalProps}
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}

EStellaDatePicker.propTypes = {
    style: PropTypes.object,
    additionalProps: PropTypes.object,
    handleDateChange: PropTypes.func.isRequired,
    selectedDate: PropTypes.any.isRequired
}