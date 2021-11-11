import {LandingPage} from "../components/LandingPage/LandingPage";
import {Meeting} from "../components/meeting/meetingTime/Meeting";
import {ApplyForm} from "../components/offers/applyForm/ApplyForm";
import {OffersView} from "../components/offers/list/OffersView";
import {offersAPI} from "./apis/OfferApi";
import {withUserAuth} from "../components/auth/withUserAuth";
import {hrOfferButtons} from "../components/offers/HrOfferButtons";
import {theme} from "./theme";
import {ApplicationsView} from "../components/applications/ApplicationsView";
import {applicationsAPI} from "./apis/applicationsAPI";
import {OfferForm} from "../components/offers/createForm/OfferForm";
import {ManageProcess} from "../components/process/manage/ManageProcess";
import {LoginForm} from "../components/auth/login/LoginForm";
import {RegistrationRouting} from "../components/auth/registration/RegistrationRouting";
import {TasksList} from "../components/tasks/crud/TasksList";
import {TaskWrapper} from "../components/tasks/TaskWrapper";
import React from "react";
import {Route} from "react-router-dom";
import {MeetingOrganizerWrapper} from "../components/meeting/preparing/MeetingOrganizerWrapper";
import HrOffersView from "../components/offers/list/HrOffersView";
import SettingsOverlay from "../components/userMenu/SettingsOverlay";
import {OrganizationPartnersManagement} from "../components/organization/OrganizationPartnersManagement";
import { WithDevPassword } from "../components/tasks/WithDevPassword";
import { ReviewTask } from "../components/tasks/review/ReviewTask";
import { Note } from '../components/notes/Note';
import {tasksApi} from '../utils/apis/tasksAPI'

const createRoute = (path, component, style={margin: "1em", marginTop: "2em"}) => {
    return {
        path,
        style,
        component
    }
}

const routes = ([reload, setReload]) => [
    createRoute("/", <div><LandingPage /><a href='https://www.freepik.com/vectors/people' style={{display:"none"}}>People vector created by pikisuperstar - www.freepik.com</a></div>),
    createRoute("/interview/:interviewId/:companyId", <Meeting />, {}),
    createRoute("/interview/:interviewId/", <Meeting />, {}),
    createRoute("/offers/apply/:id", <ApplyForm />),
    createRoute("/offers", <OffersView getOffers={() => offersAPI.getAllOffers(true)}/>),
    createRoute("/offers/:id", <OffersView getOffers={() => offersAPI.getAllOffers(true)}/>),
    createRoute("/hr/offers", withUserAuth(HrOffersView, ["hr"])),
    createRoute("/hr/offers/view/:id", withUserAuth(HrOffersView, ["hr"])),
    createRoute("/user/applications", withUserAuth(ApplicationsView, ["job_seeker"], {isHR: false, getApplications: () => applicationsAPI.getApplicationsByJobSeeker()})),
    createRoute("/hr/offers/add", withUserAuth(OfferForm, ["hr"], {onSubmit: (form) => offersAPI.create(form)})),
    createRoute("/hr/offers/edit/:id", withUserAuth(OfferForm, ["hr"], {onSubmit:(form) => offersAPI.update(form)})),
    createRoute("/hr/process/manage/:id", withUserAuth(ManageProcess, ["hr"])),
    createRoute("/hr/applications/:id", withUserAuth(ApplicationsView, ["hr"], {isHR: true, getApplications: (id) => applicationsAPI.getApplicationsByOfferId(id)})),
    createRoute("/organization/users", withUserAuth(OrganizationPartnersManagement, ["organization"])),
    createRoute("/organization/offers", withUserAuth(OffersView, ["organization"], {getOffers: () => offersAPI.getOffersFromOrganization(), buttons: hrOfferButtons(theme)})),
    createRoute("/login", <LoginForm reload={{reload, setReload}} />),
    createRoute("/register", <RegistrationRouting />),
    createRoute("/tasks/assign/:id/:mailInBase64", <WithDevPassword WrappedComponent={ApplicationsView} wrappedProps={{ isHR: false, isDev: true, getApplications: (organizationId, devMail, devPassword) => applicationsAPI.getApplicationsForDev(organizationId, devMail, devPassword)}} createPassword={(id, password) => `${id}:${password}`} />),
    createRoute("/tasks/modify/:id", <WithDevPassword WrappedComponent={TasksList} wrappedProps={{fetchTasks: (id, password) => tasksApi.getTasksByOrganization(id, password)}} createPassword={(id, password) => `${id}:${password}`} />),
    createRoute('/task/:id', <TaskWrapper />, {}),
    createRoute('/meeting/organizer/:uuid', withUserAuth(MeetingOrganizerWrapper, ["hr"], {type: "organizer"}), {marginTop: "2em"}),
    createRoute('/meeting/:type/:uuid', <MeetingOrganizerWrapper />, {marginTop: "2em"}),
    createRoute("/settings", <SettingsOverlay />),
    createRoute("/tasks/review/:id", <WithDevPassword WrappedComponent={ReviewTask} wrappedProps={{}} createPassword={(id, password) => `${password}:${id}`} />),
    createRoute("/note", <Note text="Note text as we can see" tags={["Applied", "Some tag", "Some other tag"]} />),
    createRoute("*", <div>Page</div>)
]

export const getRoutes = ([reload, setReload]) => {
    return routes([reload, setReload]).map((route, idx) => {
        return (
            <Route exact path={route.path} key={`${idx}`}>
                <div style={route.style}>
                    {route.component}
                </div>
            </Route>
        )
    })
}