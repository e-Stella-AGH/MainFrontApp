import React, {useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import {Redirect} from "react-router-dom";
import {useLoggedIn} from "../../utils/hooks/useLoggedIn";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import {jwtUtils} from "../../utils/jwt/jwtUtils";
import Box from "@material-ui/core/Box";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Popover from "@material-ui/core/Popover";
import {userTypes} from "../../utils/Enums";

export default function UserMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [direction, setDirection] = useState(null);
    const [open, setOpen] = useState(false);
    const {logout} = useLoggedIn()

    const user = jwtUtils.getUser()

    const stringToColor = (string) => {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }

        return color;
    }

    const userAvatar = (user) => {
        return {
            sx: {
                bgcolor: stringToColor(user.firstName+user.lastName),
            },
            children: `${user.firstName[0]}${user.lastName[0]}`,
        };
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChoice = (direction) => {
        setAnchorEl(null);
        setDirection(direction);
    };

    const redirect = (direction) => {
        return <Redirect to={direction} />
    }

    return <>
        {direction ? <>
            {redirect(direction)}
            <UserMenu {...props} />
        </> : <div style={props.style}>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <IconButton style={props.style} onClick={handleClick}>
                    <Avatar {...userAvatar(jwtUtils.getUser())} />
                </IconButton>
            </Box>
            <Popover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Paper>
                        <MenuList
                            id="user-menu"
                            open={Boolean(anchorEl)}
                        >
                            {user.userType === userTypes.HR && <MenuItem onClick={() => handleChoice("/hr/offers")}>
                                My offers
                            </MenuItem>}
                            {user.userType === userTypes.HR && <MenuItem onClick={() => handleChoice("/hr/offers/add")}>
                                Create offer
                            </MenuItem>}
                            {user.userType === userTypes.JOB_SEEKER && <MenuItem onClick={() => handleChoice("/user/applications")}>
                                My applications
                            </MenuItem>}
                            <MenuItem onClick={() => handleChoice("/settings")}>My profile & settings</MenuItem>
                            <MenuItem onClick={() => {
                                handleChoice("/")
                                logout()
                            }}>Logout</MenuItem>
                        </MenuList>
                    </Paper>
                </ClickAwayListener>
            </Popover>
        </div>}
    </>
}