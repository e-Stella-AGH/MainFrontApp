import {Chip, List, ListItem, Popover} from "@material-ui/core";
import PropTypes from "prop-types";
import {useState} from "react";
import {offerSort} from "../../../utils/Enums";

export const Sorter = ({label, onSort}) => {

    const [element, setElement] = useState(null)

    const openList = (event) => setElement(event.currentTarget)

    const handleClose = () => setElement(null)

    const open = Boolean(element)

    const handleItemClick = (sort) => {
        onSort(sort)
        handleClose()
    }

    const getListItems = () => {
        return offerSort
            .map(sort => <ListItem button onClick={() => handleItemClick(sort)} key={sort.name}>{sort.name}</ListItem>)
    }

    return (
        <div>
            <Chip label={label}
                  variant="outlined"
                  onClick={openList}
                  clickable
                  style={{width: "15em", height: "3em", fontSize: "1em"}}
            />
            <Popover open={open}
                 anchorEl={element}
                 onClose={handleClose}
                 anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'center',
                 }}
                 transformOrigin={{
                     vertical: 'top',
                     horizontal: 'center',
                 }}
            >
                <List>
                    {getListItems()}
                </List>
            </Popover>
        </div>
    )
}

Sorter.propTypes = {
    label: PropTypes.string.isRequired,
    onSort: PropTypes.func.isRequired
}