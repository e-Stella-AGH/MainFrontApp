import {LandingPage} from "./components/LandingPage/LandingPage";
import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {Meeting} from "./components/meeting/Meeting";
import './App.css'
import {ApplyForm} from "./components/offers/applyForm/ApplyForm";
import {AllOffersView} from "./components/offers/list/AllOffersView";
import {OfferForm} from "./components/offers/createForm/OfferForm";
import {colors} from "./utils/colors";
import {constants} from "./utils/constants";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import {LoginForm} from "./components/auth/login/LoginForm";
import {RegistrationRouting} from "./components/auth/registration/RegistrationRouting";

const createRoute = (path, component, style={marginTop: "2em"}) => {
    return {
        path,
        style,
        component
    }
}

const routes = [
    createRoute("/", <div><LandingPage /><a href='https://www.freepik.com/vectors/people' style={{display:"none"}}>People vector created by pikisuperstar - www.freepik.com</a></div>),
    createRoute("/interview/:interviewId/:companyId", <Meeting />, {}),
    createRoute("/interview/:interviewId/", <Meeting />, {}),
    createRoute("/offers/add", <OfferForm />),
    createRoute("/offers/apply/:id", <ApplyForm />),
    createRoute("/offers", <AllOffersView />),
    createRoute("/offers/:id", <AllOffersView />),
    createRoute("/login", <LoginForm />),
    createRoute("/register", <RegistrationRouting />),
    createRoute("*", <div>Page</div>)
]

function App() {

    const getRoutes = () => {
        return routes.map((route, idx) => {
            return (
                <Route exact path={route.path} key={`${idx}`}>
                    <div style={route.style}>
                        {route.component}
                    </div>
                </Route>
            )
        })
    }

  return (
          <Router>
              { /* NAVBAR */}
              <AppBar position="sticky" style={{ background: colors.navbar, height: `${constants.navbar_height}` }}>
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
                      </div>
                      <div style={{marginLeft: "auto"}}>
                          <Link to="/register" style={{color: "white", textDecoration: "none"}}>
                              <Button color="inherit" id="registerButton">Register</Button>
                          </Link>
                      </div>
                  </Toolbar>
              </AppBar>

              <Switch>
                    {getRoutes()}
              </Switch>
          </Router>
  )
}

export default App;
