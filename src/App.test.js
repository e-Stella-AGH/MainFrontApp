import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from "./App";
import {validateSchema} from "./utils/schemas/validateSchema";
import {userSchema} from "./utils/schemas/userSchema";
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
        iss: '20'
    }
    expect(validateSchema(user, userSchema)).toBe(true)
})

it('user token payload without field does not validate', () => {
    const notUser = {
        firstName: 'string',
        lastName: 'string',
        mail: 'string'
    }
    expect(validateSchema(notUser, userSchema)).toBe(false)
})

it('user token payload with incorrect field does not validate', () => {
    const notUser = {
        firstName: 'string',
        lastName: 'string',
        mail: 'string',
        iss: '20p'
    }
    expect(validateSchema(notUser, userSchema)).toBe(false)
})

it('token payload should be parsed properly', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwibWFpbCI6Im1haWxAbWFpbC5jb20ifQ.pSfH9bWF6H1hJMFCgn35YhR0hgI8uFur9XcKKj9fze4"
    expect(jwtUtils.getPayload(token)).toBe({
        iss: "1",
        firstName: "John",
        lastName: "Doe",
        mail: "mail@mail.com"
    })
})