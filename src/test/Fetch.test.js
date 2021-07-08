import {recruitmentServiceBasicAPILink} from "../utils/apis/APILinks";

describe("fetch test, so we won't push localhost again", () => {

    it("should fetch from recruitment service", async () => {
        jest.setTimeout(30000);
        const response = await fetch(recruitmentServiceBasicAPILink + "/api/offers", {method: "GET"})
        expect(response.status).toBe(200)
    })

})