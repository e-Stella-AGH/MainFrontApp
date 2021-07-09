import {offers} from "./DummyValues";
import {filterTypes} from "../utils/Enums";
import {filterOffers} from "../utils/functions";

let testOffers = offers

afterEach(() => {
    testOffers = offers
})

describe("filter offers", () => {

    it("should filter offers by minimal price", () => {
        const filters = [{type: filterTypes.MIN_SALARY, value: 10000}]
        expect(filterOffers(testOffers, filters)).toStrictEqual([offers[0], offers[1], offers[2]])
    })

    it("should filter offers by maximal price", () => {
        const filters = [{type: filterTypes.MAX_SALARY, value: 4000}]
        expect(filterOffers(testOffers, filters)).toStrictEqual([offers[3]])
    })

    it("should filter offers by company name", () => {
        const filters = [{type: filterTypes.COMPANY_NAME, value: "Pega"}]
        expect(filterOffers(testOffers, filters)).toStrictEqual([offers[0], offers[2]])
    })

    it("should filter offers by company name even if it's weirdly formatted", () => {
        const filters = [{type: filterTypes.COMPANY_NAME, value: "PeGa"}]
        expect(filterOffers(testOffers, filters)).toStrictEqual([offers[0], offers[2]])
    })

    it("should filter by all filters", () => {
        const filters = [
            {type: filterTypes.MIN_SALARY, value: 10000},
            {type: filterTypes.MAX_SALARY, value: 26000},
            {type: filterTypes.COMPANY_NAME, value: "Pega"}
        ]
        expect(filterOffers(testOffers, filters)).toStrictEqual([offers[0]])
    })

})