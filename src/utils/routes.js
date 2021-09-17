import {LandingPage} from "../components/LandingPage/LandingPage";
import {Meeting} from "../components/meeting/meetingTime/Meeting";
import {ApplyForm} from "../components/offers/applyForm/ApplyForm";
import {OffersView} from "../components/offers/list/OffersView";
import {offersAPI} from "./apis/OfferApi";
import {withUserAuth} from "../components/auth/withUserAuth";
import {hrOfferButtons} from "../components/offers/HrOfferButtons";
import {theme} from "../test/utils/theme";
import {ApplicationsView} from "../components/applications/ApplicationsView";
import {applicationsAPI} from "./apis/applicationsAPI";
import {OfferForm} from "../components/offers/createForm/OfferForm";
import {ManageProcess} from "../components/process/manage/ManageProcess";
import {OrganizationsPartnerList} from "../components/organization/OrganizationsPartnerList";
import {organizationsAPI} from "./apis/OrganizationApi";
import {LoginForm} from "../components/auth/login/LoginForm";
import {RegistrationRouting} from "../components/auth/registration/RegistrationRouting";
import {TasksViewWrapper} from "../components/tasks/TasksViewWrapper";
import {getTasks} from "../test/DummyValues";
import {TaskWrapper} from "../components/tasks/TaskWrapper";
import React from "react";
import {Route} from "react-router-dom";
import {MeetingOrganizer} from "e-stella-meeting-organizer";
import {MeetingOrganizerWrapper} from "../components/meeting/preparing/MeetingOrganizerWrapper";

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
    createRoute('/task/:id', <TaskWrapper />, {}),
    createRoute('/meeting/organizer', withUserAuth(MeetingOrganizerWrapper, ["hr"], {type: "organizer"})),
    createRoute('/meeting/:type/:uuid', <MeetingOrganizerWrapper />),
    createRoute("*", <div>Page</div>)
]

export const getRoutes = () => {
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