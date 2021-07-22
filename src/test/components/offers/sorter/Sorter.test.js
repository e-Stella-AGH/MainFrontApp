import {SorterWrapper} from "../../../../components/offers/sorter/SorterWrapper";
import {render, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import {offerSort} from "../../../../utils/Enums";

describe("sorter tests", () => {

    it("should display list of sort names", () => {
        render(<SorterWrapper onSort={() => {}}/>)
        userEvent.click(screen.getByRole('button'))

        expect(screen.getByRole('list')).toBeVisible()
        Object.entries(offerSort).map(elem => elem[1].name).forEach( name => {
            expect(screen.getByRole('list').innerHTML).toContain(name)
        })
    })

})