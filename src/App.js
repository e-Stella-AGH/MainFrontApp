import {LandingPage} from "./components/LandingPage/LandingPage";
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Meeting} from "./components/meeting/Meeting";
import './App.css'
import {ApplyForm} from "./components/offers/applyForm/ApplyForm";
import {OffersView} from "./components/offers/list/OffersView";
import {OfferForm} from "./components/offers/createForm/OfferForm";
import {ThemeProvider} from '@material-ui/styles';
import {LoginForm} from "./components/auth/login/LoginForm";
import {RegistrationRouting} from "./components/auth/registration/RegistrationRouting";
import {offersAPI} from "./utils/apis/OfferApi";
import {hrOfferButtons} from "./components/offers/HrOfferButtons";
import {OrganizationPartnersManagement} from "./components/organization/OrganizationPartnersManagement";
import {withUserAuth} from "./components/auth/withUserAuth";
import {ManageProcess} from "./components/process/manage/ManageProcess";
import {ApplicationsView} from "./components/applications/ApplicationsView";
import {applicationsAPI} from "./utils/apis/applicationsAPI";
import Navbar from "./components/navbar/Navbar";
import {getTasks} from "./test/DummyValues";
import {TaskWrapper} from "./components/tasks/TaskWrapper";
import {TasksViewWrapper} from "./components/tasks/TasksViewWrapper";
import {theme} from "./test/utils/theme";
import SettingsOverlay from "./components/userMenu/SettingsOverlay";
import HrOffersView from "./components/offers/list/HrOffersView";

const createRoute = (path, component, style={margin: "1em", marginTop: "2em"}) => {
    return {
        path,
        style,
        component
    }
}

const routes = [
    ["/", <div><LandingPage /><a href='https://www.freepik.com/vectors/people' style={{display:"none"}}>People vector created by pikisuperstar - www.freepik.com</a></div>],
    ["/interview/:interviewId/:companyId", <Meeting />, {}],
    ["/interview/:interviewId/", <Meeting />, {}],
    ["/offers/apply/:id", <ApplyForm />],
    ["/offers", <OffersView getOffers={offersAPI.getAllOffers}/>],
    ["/offers/:id", <OffersView getOffers={offersAPI.getAllOffers}/>],
    ["/hr/offers", withUserAuth(HrOffersView, ["hr"])],
    ["/hr/offers/view/:id", withUserAuth(HrOffersView, ["hr"])],
    ["/user/applications", withUserAuth(ApplicationsView, ["job_seeker"], {isHR: false, getApplications: () => applicationsAPI.getApplicationsByJobSeeker()})],
    ["/hr/offers/add", withUserAuth(OfferForm, ["hr"], {onSubmit: (form) => offersAPI.create(form)})],
    ["/hr/offers/edit/:id", withUserAuth(OfferForm, ["hr"], {onSubmit:(form) => offersAPI.update(form)})],
    ["/hr/process/manage/:id", withUserAuth(ManageProcess, ["hr"])],
    ["/hr/applications/:id", withUserAuth(ApplicationsView, ["hr"], {isHR: true, getApplications: (id) => applicationsAPI.getApplicationsByOfferId(id)})],
    ["/organization/users", withUserAuth(OrganizationPartnersManagement, ["organization"])],
    ["/organization/offers", withUserAuth(OffersView, ["organization"], {getOffers: () => offersAPI.getOffersFromOrganization(), buttons: hrOfferButtons(theme)})],
    ["/login", <LoginForm />],
    ["/register", <RegistrationRouting />],
    ["/tasks/:organizationId", <TasksViewWrapper fetchTasks={(id) => getTasks(id)} />],
    ['/task/:id', <TaskWrapper />, {}],
    ["/settings", <SettingsOverlay />],
    ["*", <div>Page</div>]
].map(buildingArray => createRoute(...buildingArray))

function App() {

    const getRoutes = () => {
        return routes.map((route, idx) =>
            <Route exact path={route.path} key={`${idx}`}>
                <div style={route.style}>
                    {route.component}
                </div>
            </Route>
        )
    }

  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Navbar />
          <Switch>
              {getRoutes()}
          </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
