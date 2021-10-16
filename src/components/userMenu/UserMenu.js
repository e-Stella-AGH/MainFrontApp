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
import {makeStyles} from "@material-ui/core";
import {deepOrange, deepPurple} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    purple0: {
        backgroundColor: deepPurple[300],
        color: theme.palette.getContrastText(deepPurple[300])
    },
    purple1: {
        backgroundColor: deepPurple[200],
        color: theme.palette.getContrastText(deepPurple[100])
    },
    pink0: {
        backgroundColor: "#b53387",
        color: theme.palette.getContrastText("#b53387")
    },
    green0: {
        backgroundColor: "#0c4f06",
        color: theme.palette.getContrastText("#0c4f06")
    },
    red0: {
        backgroundColor: "#de2618",
        color: theme.palette.getContrastText("#de2618")
    },
    red1: {
        backgroundColor: "#9c0a00",
        color: theme.palette.getContrastText("#9c0a00")
    },
    orange0: {
        backgroundColor: deepOrange[500],
        color: theme.palette.getContrastText(deepOrange[500])
    },
    orange1: {
        backgroundColor: deepOrange[300],
        color: theme.palette.getContrastText(deepOrange[300])
    },
    orange2: {
        backgroundColor: deepOrange[200],
        color: theme.palette.getContrastText(deepOrange[200])
    },
}))

export default function UserMenu(props) {
    const styles = useStyles()

    const [anchorEl, setAnchorEl] = useState(null);
    const [direction, setDirection] = useState(null);
    const [open, setOpen] = useState(false);
    const {logout} = useLoggedIn()

    const user = jwtUtils.getUser()

    const colors = Object.values(styles)

    const stringToColor = (string) => {
        let hash = 0;

        for (let i = 0; i < string.length; i += 1) {
            hash = (string.charCodeAt(i) + ((hash << 5) - hash)) % 100;
        }

        return colors[hash % colors.length];
    }

    const userAvatar = (user) => {
        return {
            className: stringToColor(user.firstName+user.lastName+user.mail),
            children: `${user.firstName[0] || user.lastName[0] || user.mail[0] || ""}`,
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

    return user && <>
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
                            {user.userType === userTypes.ORGANIZATION && <MenuItem onClick={() => handleChoice("/organization/offers")}>
                                Company's offers
                            </MenuItem>}
                            {user.userType === userTypes.ORGANIZATION && <MenuItem onClick={() => handleChoice("/organization/users")}>
                                Company's partners
                            </MenuItem>}
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