import {EStellaDatePicker} from "../../commons/EStellaDatePicker";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

export const ManageDate = ({selectedDate, onChange, processStartDate, disabled, label}) => {

    const handleDateChange = (date) => {
        if (!processStartDate || date > new Date(processStartDate)) {
            onChange(date)
        } else {
            Swal.fire({
                title: "Oops, you cannot do this!",
                text: "Looks like you've tried to set a date that's earlier than today!",
                icon: "error"
            })
        }
    }

    return <EStellaDatePicker
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            divStyle={{marginLeft: "1em", marginRight: "auto"}}
            disabled={disabled}
            label={label}
        />
}

ManageDate.propTypes = {
    selectedDate: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
}