import {AppBar, Button, Toolbar, Typography, useTheme} from "@material-ui/core";
import {colors} from "../../utils/colors";
import {constants} from "../../utils/constants";
import {Link} from "react-router-dom";
import React from "react";

export const Navbar = () => {

    const theme = useTheme()

    return (
        <AppBar position="sticky" style={{background: colors.navbar, height: `${constants.navbar_height}`, zIndex: theme.zIndex.drawer + 1}}>
            <Toolbar>
                <div style={{marginLeft: "2%", marginRight: "1%"}}>
                    <Link to="/" style={{color: "white", textDecoration: "none"}}>
                        <Typography variant="h6">
                            e-Stella
                        </Typography>
                    </Link>
                </div>
                <div style={{marginLeft: "1%", marginRight: "auto"}}>
                    <Link to="/offers" style={{color: "white", textDecoration: "none"}}>
                        <Button color="inherit">Offers</Button>
                    </Link>
                </div>
                <div style={{marginLeft: "auto"}}>
                    <Link to="/login" style={{color: "white", textDecoration: "none"}}>
                        <Button color="inherit" id="loginButton">Login</Button>
                    </Link>
                    <Link to="/register" style={{color: "white", textDecoration: "none"}}>
                        <Button color="inherit" id="registerButton">Register</Button>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar