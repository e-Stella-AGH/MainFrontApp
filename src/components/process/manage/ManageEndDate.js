import {EStellaDatePicker} from "../../commons/EStellaDatePicker";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

export const ManageEndDate = ({selectedDate, onChange, processStartDate}) => {

    const handleDateChange = (date) => {
        if (date > new Date(processStartDate)) {
            onChange(date)
        } else {
            Swal.fire({
                title: "Oops, you cannot do this!",
                text: "Looks like you've tried to set a date that's earlier than start date!",
                icon: "error"
            })
        }
    }

    return <EStellaDatePicker
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            divStyle={{marginLeft: "1em", marginRight: "auto"}}
        />
}

ManageEndDate.propTypes = {
    selectedDate: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
}