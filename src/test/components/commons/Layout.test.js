import {render, screen} from '@testing-library/react'
import {ListWithSelection} from "../../../components/commons/layouts/ListWithSelection";
import {ListElementDetails} from "../../../components/commons/layouts/ListElementDetails";
import userEvent from "@testing-library/user-event";

describe("Base layout test", () => {

    it("should display anything we apply in list", () => {
        const listItems = [{first: "first", second: "second", third: "third"}]
        const extractData = (item) => item
        render(<ListWithSelection listItems={listItems} propsHandleSelect={() => {}} extractData={extractData} limit={NaN} />)

        expect(screen.getByText("first")).toBeVisible()
        expect(screen.getByText("second")).toBeVisible()
        expect(screen.getByText("third")).toBeVisible()
    })

    it("should perform action when element is clicked by user", () => {
        const listItems = [{first: "first", second: "second", third: "third"}]
        const extractData = (item) => item
        render(<ListWithSelection listItems={listItems} extractData={extractData} limit={NaN}
                                  propsHandleSelect={() => document.body.innerHTML = "<h1>Clicked!</h1>"} />)

        userEvent.click(screen.getByText("first"))

        expect(screen.getByText("Clicked!")).toBeVisible()
    })

    it("should display content of data in ListElementDetails", () => {
        const content = <h5>Title</h5>
        render(<ListElementDetails cardContent={content} />)

        expect(screen.getByText("Title")).toBeVisible()
    })

})