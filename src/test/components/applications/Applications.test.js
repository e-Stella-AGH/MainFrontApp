import {render, screen, waitFor} from '@testing-library/react'
import {Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import {ApplicationsView} from "../../../components/applications/ApplicationsView";
import {getApplications} from "../../DummyValues";
import {createMemoryHistory} from 'history';

describe("Should render Applications View correctly", () => {

    const renderApplicationsView = (isHR) => {
        const history = createMemoryHistory()
        const route = '/hr/applications/:id'
        history.push(route)

        render(
            <Router history={history}>
                <ApplicationsView getApplications={getApplications} isHR={isHR}/>
            </Router>
        )
    }

    it("Should be able to display applications in list and display empty state before selecting one", async () => {
        renderApplicationsView(true)

        const [first, second] = await getApplications()

        expect(screen.getByText(first.status)).toBeVisible()
        expect(screen.getByText(first.stage.type)).toBeVisible()

        expect(screen.getByText(second.status)).toBeVisible()
        expect(screen.getByText(second.stage.type)).toBeVisible()

        expect(screen.getByText("Select Application", {exact: false})).toBeVisible()
    })

    it("should display all application view after clicking on one", async () => {
        renderApplicationsView(true)

        const [first, _] = await getApplications()

        expect(screen.getByText(first.status)).toBeVisible()
        expect(screen.getByText(first.stage.type)).toBeVisible()

        userEvent.click(screen.getByText(first.status))

        screen.getAllByText(first.status).forEach(elem => expect(elem).toBeVisible())
        expect(screen.getByText(first.jobSeeker.user.mail)).toBeVisible()
        screen.getAllByText(`${first.jobSeeker.user.firstName} ${first.jobSeeker.user.lastName}`).forEach(elem => expect(elem).toBeVisible())
        expect(screen.getByText("Reject Application", {exact: false})).toBeVisible()
        expect(screen.getByText("Next Stage", {exact: false})).toBeVisible()
    })

    it("should not display buttons when user isn't hr", async () => {
        renderApplicationsView(false)

        const [first, _] = await getApplications()

        userEvent.click(screen.getByText(first.status))

        screen.getAllByText(first.status).forEach(elem => expect(elem).toBeVisible())
        expect(screen.getByText(first.jobSeeker.user.mail)).toBeVisible()
        screen.getAllByText(`${first.jobSeeker.user.firstName} ${first.jobSeeker.user.lastName}`).forEach(elem => expect(elem).toBeVisible())

        await waitFor(() => {
            expect(screen.queryByText("Reject Application", {exact: false})).toBeNull()
            expect(screen.queryByText("Next Stage", {exact: false})).toBeNull()
        })
    })

})