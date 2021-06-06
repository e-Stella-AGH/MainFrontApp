import {Navbar} from "./components/navbar/Navbar";
import {LandingPage} from "./components/LandingPage/LandingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Meeting} from "./components/meeting/Meeting";
import './App.css'
import {OfferDetails} from "./components/offers/details/OffersDetails";


function App() {
  return (
    <div>
      <Navbar />
      <div>
          <Router>
              <Switch>

                  <Route exact path="/">
                      <div style={{marginTop: "2em"}}>
                          <LandingPage />
                          <a href='https://www.freepik.com/vectors/people' style={{display:"none"}}>People vector created by pikisuperstar - www.freepik.com</a>
                      </div>
                  </Route>

                  <Route path="/interview/:companyId/:interviewId">
                    <Meeting />
                  </Route>
                  <Route path="/interview/:interviewId">
                      <div>
                        <Meeting />
                      </div>
                  </Route>
                  <Route path="/offers/details/:id">
                      <div style={{marginTop: "2em"}}>
                        <OfferDetails />
                      </div>
                  </Route>

                  <Route path="*">
                      Page
                  </Route>
              </Switch>
          </Router>
      </div>
  </div>
  );
}

export default App;
