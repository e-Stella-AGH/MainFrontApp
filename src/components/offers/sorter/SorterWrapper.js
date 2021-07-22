import {useState} from "react";
import {Sorter} from "./Sorter";

export const SorterWrapper = ({ onSort }) => {
    const [label, setLabel] = useState("Sort")

    const handleOnSort = (elem) => {
        setLabel(elem[1].name)
        onSort(elem)
    }

    return (
        <Sorter label={label} onSort={handleOnSort} />
    )
}