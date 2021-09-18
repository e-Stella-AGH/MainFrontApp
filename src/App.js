import {LandingPage} from "./components/LandingPage/LandingPage";
import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
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
import {OrganizationsPartnerList} from "./components/organization/OrganizationsPartnerList";
import {organizationsAPI} from "./utils/apis/OrganizationApi";
import {withUserAuth} from "./components/auth/withUserAuth";
import {ManageProcess} from "./components/process/manage/ManageProcess";
import {ApplicationsView} from "./components/applications/ApplicationsView";
import {applicationsAPI} from "./utils/apis/applicationsAPI";
import Navbar from "./components/navbar/Navbar";
import {getTasks} from "./test/DummyValues";
import {TaskWrapper} from "./components/tasks/TaskWrapper";
import {TasksViewWrapper} from "./components/tasks/TasksViewWrapper";
import {theme} from "./test/utils/theme";

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
    createRoute("/offers/apply/:id", <ApplyForm />),
    createRoute("/offers", <OffersView getOffers={offersAPI.getAllOffers}/>, {margin: "1em", marginTop: "2em"}),
    createRoute("/offers/:id", <OffersView getOffers={offersAPI.getAllOffers}/>, {margin: "1em", marginTop: "2em"}),
    createRoute("/hr/offers", withUserAuth(OffersView, ["hr"], {getOffers: () => offersAPI.getOffersFromHr(), buttons: hrOfferButtons(theme)})),
    createRoute("/user/applications", withUserAuth(ApplicationsView, ["job_seeker"], {isHR: false, getApplications: () => applicationsAPI.getApplicationsByJobSeeker()})),
    createRoute("/hr/offers/add", withUserAuth(OfferForm, ["hr"], {onSubmit: (form) => offersAPI.create(form)})),
    createRoute("/hr/offers/edit/:id", withUserAuth(OfferForm, ["hr"], {onSubmit:(form) => offersAPI.update(form)})),
    createRoute("/hr/process/manage/:id", withUserAuth(ManageProcess, ["hr"])),
    createRoute("/hr/applications/:id", withUserAuth(ApplicationsView, ["hr"], {isHR: true, getApplications: (id) => applicationsAPI.getApplicationsByOfferId(id)})),
    createRoute("/organization/users", withUserAuth(OrganizationsPartnerList, ["organization"], {users: () => organizationsAPI.getHrPartnersByOrganization()})),
    createRoute("/organization/offers", withUserAuth(OffersView, ["organization"], {getOffers: () => offersAPI.getOffersFromOrganization(), buttons: hrOfferButtons(theme)})),
    createRoute("/login", <LoginForm />),
    createRoute("/register", <RegistrationRouting />),
    createRoute("/tasks/:organizationId", <TasksViewWrapper fetchTasks={(id) => getTasks(id)} />),
    createRoute('/task/:id', <TaskWrapper />, {})
    createRoute("/settings", <SettingsOverlay />, {marginTop: "1em"}),
    // TODO: Does not work, dont know why
    createRoute("/settings/profile", <Redirect to={{path: "/settings", state: { subPage: "profile" }}} />),
    createRoute("/settings/settings", <Redirect to={{path: "/settings", state: { subPage: "settings" }}} />),
    createRoute("/settings/files", <Redirect to={{path: "/settings", state: { subPage: "files" }}} />),
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
