import TestRenderer from 'react-test-renderer';
import {ActiveFilter} from "../../../components/offers/filter/ActiveFilter";
import {filterTypes} from "../../../utils/Enums";
import {Avatar} from "@material-ui/core";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import BusinessIcon from "@material-ui/icons/Business";
import PersonIcon from "@material-ui/icons/Person";

const createRenderer = (type) => TestRenderer.create(
    <ActiveFilter filter={{type: type, value: 4000}} handleDelete={() => {}} label={"xd"} />
)

describe("renders good avatar icon on Chip based on filter", () => {

    it("should render MonetizationOnIcon when filter type is MIN_SALARY", () => {
        const renderer = createRenderer(filterTypes.MIN_SALARY)
        const testInstance = renderer.root

        expect(testInstance.findByType(Avatar).props.id).toBe("xd-avatar")
        expect(testInstance.findByType(MonetizationOnIcon).props.id).toBe(`min-filter-icon`)
    })

    it("should render MonetizationOnIcon when filter type is MAX_SALARY", () => {
        const renderer = createRenderer(filterTypes.MAX_SALARY)
        const testInstance = renderer.root

        expect(testInstance.findByType(Avatar).props.id).toBe("xd-avatar")
        expect(testInstance.findByType(MonetizationOnIcon).props.id).toBe(`max-filter-icon`)
    })

    it("should render BussinesIcon when filter type is COMPANY_NAME", () => {
        const renderer = createRenderer(filterTypes.COMPANY_NAME)
        const testInstance = renderer.root

        expect(testInstance.findByType(Avatar).props.id).toBe("xd-avatar")
        expect(testInstance.findByType(BusinessIcon).props.id).toBe(`company-filter-icon`)
    })

    it("should render Icon when filter type is MIN_SALARY", () => {
        const renderer = createRenderer(filterTypes.POSITION_NAME)
        const testInstance = renderer.root

        expect(testInstance.findByType(Avatar).props.id).toBe("xd-avatar")
        expect(testInstance.findByType(PersonIcon).props.id).toBe(`position-filter-icon`)
    })

})