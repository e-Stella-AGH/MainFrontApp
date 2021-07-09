import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from "./App";
import {validateSchema} from "./utils/schemas/validateSchema";
import {tokenPayloadSchema} from "./utils/schemas/tokenPayloadSchema";
import {jwtUtils} from "./utils/jwt/jwtUtils";

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('renders login button with "Login" text', () => {
    act(() => {
        ReactDOM.render(<App />, container)
    })
    const loginButton = container.querySelector('#loginButton')
    expect(loginButton.textContent).toBe("Login")
})

it('user token payload validates', () => {
    const user = {
        firstName: 'string',
        lastName: 'string',
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
        mail: 'string',
        iss: '20p',
        iat: 20,
        exp: 10
    }
    expect(validateSchema(notUser, tokenPayloadSchema)).toBe(false)
})

it('token payload should be parsed properly', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwibWFpbCI6Im1haWxAbWFpbC5jb20ifQ.pSfH9bWF6H1hJMFCgn35YhR0hgI8uFur9XcKKj9fze4"
    expect(jwtUtils.getPayload(token)).toStrictEqual({
        iss: "1",
        firstName: "John",
        lastName: "Doe",
        mail: "mail@mail.com"
    })
})

it('parsed token payload should be translated to user properly', () => {
    const payload = {
        iss: "1",
        firstName: "John",
        lastName: "Doe",
        mail: "mail@mail.com",
        iat: 10,
        exp: 20
    }
    expect(jwtUtils.payloadToOptUser(payload)).toStrictEqual({
        userId: 1,
        firstName: "John",
        lastName: "Doe",
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