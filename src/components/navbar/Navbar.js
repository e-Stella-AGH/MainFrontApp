import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {colors} from "../../utils/colors";
import { BrowserRouter as Router, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const Navbar = (props) => {

    const classes = useStyles()

    return(
        <AppBar position="static" className={classes.root} style={{ background: colors.navbar }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>

                </IconButton>
                <Router>
                    <Link to="/">
                        <Typography variant="h6" className={classes.title}>
                            e-Stella
                        </Typography>
                    </Link>
                    <Link to="/login">
                        <Button color="inherit" id="loginButton">Login</Button>
                    </Link>
                </Router>
            </Toolbar>
        </AppBar>
    )
}