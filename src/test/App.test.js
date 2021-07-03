import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from "../App";

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