import React, {useState} from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Redirect} from "react-router-dom";
import {useLoggedIn} from "../../utils/hooks/useLoggedIn";
import IconButton from "@material-ui/core/IconButton";
import {Face} from "@material-ui/icons";

export default function UserMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [direction, setDirection] = useState(null);
    const {logout} = useLoggedIn()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleChoice = (direction) => {
        setAnchorEl(null);
        setDirection(direction)
    };

    const redirect = (direction) => {
        const dir = direction
        return <Redirect to={dir} />
    }

    return <>
        {direction ? <>
            {redirect(direction)}
            <UserMenu {...props} />
        </> : <div style={props.style}>
            <IconButton style={props.style} aria-controls="user-menu" aria-haspopup="true" onClick={handleClick}>
                <Face />
            </IconButton>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => handleChoice(null)}
                >
                <MenuItem onClick={() => handleChoice("/settings")}>My profile & settings</MenuItem>
                <MenuItem onClick={() => {
                    handleChoice("/")
                    logout()
                }}>Logout</MenuItem>
            </Menu>
        </div>}
    </>
}