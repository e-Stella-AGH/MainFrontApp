import {recruitmentServiceBasicAPILink} from "../utils/apis/APILinks";

describe("fetch test, so we won't push localhost again", () => {

    it("should fetch from recruitment service", async () => {
        expect(recruitmentServiceBasicAPILink).toBe("https://recruitment-service-estella.herokuapp.com")
    })

})