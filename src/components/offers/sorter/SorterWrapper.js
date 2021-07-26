import {useState} from "react";
import {Sorter} from "./Sorter";
import PropTypes from "prop-types";

export const SorterWrapper = ({ onSort }) => {
    const [label, setLabel] = useState("Sort Offers")

    const handleOnSort = (elem) => {
        setLabel(elem.name)
        onSort(elem)
    }

    return (
        <Sorter label={label} onSort={handleOnSort} />
    )
}

Sorter.propTypes = {
    onSort: PropTypes.func.isRequired
}