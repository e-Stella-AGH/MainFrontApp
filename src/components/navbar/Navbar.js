import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {colors} from "../../utils/colors";
import { BrowserRouter as Router, Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';

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
        <AppBar position="static" style={{ background: colors.main, height: "60px" }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
                    <MenuIcon />
                </IconButton>
                <Router>
                    <div>
                        <Link to="/" style={{color: "white", textDecoration: "none"}}>
                            <Typography variant="h6" className={classes.title}>
                                e-Stella
                            </Typography>
                        </Link>
                    </div>
                    <div>
                        <Link to="/login" style={{color: "white", textDecoration: "none"}}>
                            <Button color="inherit" id="loginButton">Login</Button>
                        </Link>
                    </div>
                </Router>
            </Toolbar>
        </AppBar>
    )
}