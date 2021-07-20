import {validateSchema} from "../utils/schemas/validateSchema";
import {tokenPayloadSchema} from "../utils/schemas/tokenPayloadSchema";
import {jwtUtils} from "../utils/jwt/jwtUtils";
import {userTypes} from "../utils/Enums";

it('user token payload validates', () => {
    const user = {
        firstName: 'string',
        lastName: 'string',
        userType: userTypes.HR,
        mail: 'string',
        iss: '20',
        iat: 10,
        exp: 20
    }
    expect(validateSchema(user, tokenPayloadSchema)).toBe(true)
})

it('user token payload without field does not validate', () => {
    const notUser = {
        firstName: 'string',
        lastName: 'string',
        mail: 'string',
        iat: 10
    }
    expect(validateSchema(notUser, tokenPayloadSchema)).toBe(false)
})

it('user token payload with incorrect field does not validate', () => {
    const notUser = {
        firstName: 'string',
        lastName: 'string',
        userType: userTypes.HR,
        mail: 'string',
        iss: '20p',
        iat: 20,
        exp: 10
    }
    expect(validateSchema(notUser, tokenPayloadSchema)).toBe(false)
})

it('token payload should be parsed properly', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICAgImlzcyI6ICIxIiwKICAgICJmaXJzdE5hbWUiOiAiSm9obiIsCiAgICAibGFzdE5hbWUiOiAiRG9lIiwKICAgICJ1c2VyVHlwZSI6ICJociIsCiAgICAibWFpbCI6ICJtYWlsQG1haWwuY29tIiwKICAgICJpYXQiOiAxMCwKICAgICJleHAiOiAyMAp9.pSfH9bWF6H1hJMFCgn35YhR0hgI8uFur9XcKKj9fze4"
    expect(jwtUtils.getPayload(token)).toStrictEqual({
        iss: "1",
        firstName: "John",
        lastName: "Doe",
        userType: "hr",
        mail: "mail@mail.com",
        iat: 10,
        exp: 20
    })
})

it('parsed token payload should be translated to user properly', () => {
    const payload = {
        iss: "1",
        firstName: "John",
        lastName: "Doe",
        userType: userTypes.JOB_SEEKER,
        mail: "mail@mail.com",
        iat: 10,
        exp: 20
    }
    expect(jwtUtils.payloadToOptUser(payload)).toStrictEqual({
        userId: 1,
        firstName: "John",
        lastName: "Doe",
        userType: userTypes.JOB_SEEKER,
        mail: "mail@mail.com"
    })
})

it('active token should be considered active', () => {
    const payload = {
        iat: Date.now() - 10000,
        exp: Date.now() + 10000
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." + btoa(JSON.stringify(payload)) + ".pSfH9bWF6H1hJMFCgn35YhR0hgI8uFur9XcKKj9fze4"
    expect(jwtUtils.isTokenActive(token)).toBe(true)
})

it('expired token should not be active', () => {
    const payload = {
        iat: Date.now() - 10000,
        exp: Date.now() - 5000
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." + btoa(JSON.stringify(payload)) + ".pSfH9bWF6H1hJMFCgn35YhR0hgI8uFur9XcKKj9fze4"
    expect(jwtUtils.isTokenActive(token)).toBe(false)
})