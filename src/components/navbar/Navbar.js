import {AppBar, Button, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {colors} from "../../utils/colors";
import {BrowserRouter as Router, Link} from "react-router-dom";

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
                <Router>
                    <div className={classes.title}>
                        <Link to="/" style={{color: "white", textDecoration: "none"}}>
                            <Typography variant="h6">
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