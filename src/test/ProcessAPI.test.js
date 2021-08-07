import {processAPI} from "../utils/apis/ProcessAPI";

describe("should format date in dd.mm.yyyy format", () => {

    it("should format date with two numbers in day", () => {
        const date = new Date("2021-12-19")

        expect(processAPI._prepareDate(date)).toBe("19.12.2021")
    })

    it("should format date with one number in day", () => {
        const date = new Date("2021-12-09")

        expect(processAPI._prepareDate(date)).toBe("09.12.2021")
    })

    it("should format date with one number in month", () => {
        const date = new Date("2021-01-19")

        expect(processAPI._prepareDate(date)).toBe("19.01.2021")
    })

    it("should format date with one number in month and one number in day", () => {
        const date = new Date("2021-01-09")

        expect(processAPI._prepareDate(date)).toBe("09.01.2021")
    })

})