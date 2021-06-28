import {LandingPage} from "./components/LandingPage/LandingPage";
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
import {UserRegistration} from "./components/auth/registration/UserRegistration";
import {RegistrationRouting} from "./components/auth/registration/RegistrationRouting";


function App() {
  return (
      <Router>

          { /* NAVBAR */}
          <AppBar position="sticky" style={{ background: colors.main, height: `${constants.navbar_height}` }}>
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

          {/* CONTENT */}

          <Switch>
              <Route exact path="/">
                  <div style={{marginTop: "2em"}}>
                      <LandingPage />
                      <a href='https://www.freepik.com/vectors/people' style={{display:"none"}}>People vector created by pikisuperstar - www.freepik.com</a>
                  </div>
              </Route>

              <Route exact path="/interview/:interviewId/:companyId">
                <Meeting />
              </Route>
              <Route exact path="/interview/:interviewId">
                  <div>
                    <Meeting />
                  </div>
              </Route>

              <Route exact path="/offers/add">
                  <div style={{marginTop: "2em"}}>
                    <OfferForm />
                  </div>
              </Route>

              <Route exact path="/offers/apply/:id">
                  <div style={{marginTop: "2em"}}>
                    <ApplyForm />
                  </div>
              </Route>

              <Route exact path="/offers">
                  <div style={{margin: "2em"}}>
                      <AllOffersView />
                  </div>
              </Route>

              <Route exact path="/login">
                  <div style={{margin: "2em"}}>
                      <LoginForm />
                  </div>
              </Route>

              <Route exact path="/register">
                  <div style={{margin: "2em"}}>
                      <RegistrationRouting />
                  </div>
              </Route>

              <Route path="*">
                  Page
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
