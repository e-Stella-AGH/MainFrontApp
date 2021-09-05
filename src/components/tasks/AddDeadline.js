import {Typography} from "@material-ui/core";
import {EStellaDatePicker} from "../commons/EStellaDatePicker";
import {useState} from "react";
import Swal from 'sweetalert2'

export const AddDeadline = ({ handleChange }) => {

    const [selectedDate, setSelectedDate] = useState(Date.now())

    const handleDateChange = (date) => {
        Swal.resetValidationMessage()
        if(date < Date.now()) {
            Swal.showValidationMessage("If you set deadline earlier than now, nobody will be able to solve this task!")
        } else {
            setSelectedDate(date)
            handleChange(date)
        }
    }

    return (
        <div>
            <Typography variant="h6">Add deadline to your task</Typography>
            <EStellaDatePicker handleDateChange={handleDateChange} selectedDate={selectedDate} label="Deadline"/>
        </div>
    )
}