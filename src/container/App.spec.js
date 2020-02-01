import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const setup = (path) => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <App></App>
        </MemoryRouter>
    );
}


describe('App Page', () => {

    it('displays home page when url is /', () => {
        const {queryByTestId} = setup('/');
        expect(queryByTestId('homepage')).toBeInTheDocument();
    });

    it('displays login page when url is /login', () => {
        const {container} = setup('/login');
        const header = container.querySelector('h1')
        expect(header).toHaveTextContent('Log In');
    });

    it('displays only login page when url is /login', () => {
        const {queryByTestId} = setup('/login');
        expect(queryByTestId('homepage')).not.toBeInTheDocument();
    });

    it('displays signup page when url is /signup', () => {
        const {container} = setup('/signup');
        const header = container.querySelector('h1')
        expect(header).toHaveTextContent('Sign Up');
    });

    it('displays user page when url is not /, /login, /signup', () => {
        const {queryByTestId} = setup('/user1');
        expect(queryByTestId('userpage')).toBeInTheDocument();
    });
})