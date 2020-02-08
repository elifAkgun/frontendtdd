import React from 'react';
import { render,fireEvent, waitForElement } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import axios from 'axios';
import configureStore from '../redux/configureStore'


const setup = (path) => {
    const store = configureStore(false);
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[path]}>
                <App></App>
            </MemoryRouter>
        </Provider>
    );  
};

const changeEvent = (content) => {
    return {
        target: {
            value: content
        }
    }
};


describe('App Page', () => {

    it('displays home page when url is /', () => {
        const { queryByTestId } = setup('/');
        expect(queryByTestId('homepage')).toBeInTheDocument();
    });

    it('displays login page when url is /login', () => {
        const { container } = setup('/login');
        const header = container.querySelector('h1')
        expect(header).toHaveTextContent('Log In');
    });

    it('displays only login page when url is /login', () => {
        const { queryByTestId } = setup('/login');
        expect(queryByTestId('homepage')).not.toBeInTheDocument();
    });

    it('displays signup page when url is /signup', () => {
        const { container } = setup('/signup');
        const header = container.querySelector('h1')
        expect(header).toHaveTextContent('Sign Up');
    });

    it('displays user page when url is not /, /login, /signup', () => {
        const { queryByTestId } = setup('/user1');
        expect(queryByTestId('userpage')).toBeInTheDocument();
    });

    it('displays My Profile on TopBar after login success', async () => {
        const { queryByPlaceholderText, container, queryByText } = setup('/login');
   

        const userNameInput = queryByPlaceholderText('Your User Name');
        const passwordInput = queryByPlaceholderText('Your Password');

        fireEvent.change(userNameInput, changeEvent('user1'));
        fireEvent.change(passwordInput, changeEvent('my-passwoP3rd'));
        const button = container.querySelector('button');

        axios.post = jest.fn().mockResolvedValue({
            data: {
                id: 1,
                username : 'user1',
                displayname: 'display1',
                image : 'img1.jpg'
            }
        });
        fireEvent.click(button);
        const myProfile = await waitForElement(() => queryByText('My Profile'));
        expect( myProfile).toBeInTheDocument();
    });

    it('displays My Profile on TopBar after signup success', async () => {
        const { queryByPlaceholderText, container, queryByText } = setup('/signup');
   

        const displayNameInput = queryByPlaceholderText('Your Display Name');
        const userNameInput = queryByPlaceholderText('Your User Name');
        const passwordInput = queryByPlaceholderText('Your Password');
        const repeatPasswordInput = queryByPlaceholderText('Your Repeat Password');

        fireEvent.change(displayNameInput, changeEvent('display1'));
        fireEvent.change(userNameInput, changeEvent('user1'));
        fireEvent.change(passwordInput, changeEvent('my-passwoP3rd'));
        fireEvent.change(repeatPasswordInput, changeEvent('my-passwoP3rd'));
 
        const button = container.querySelector('button');
        
        axios.post = jest.fn().mockResolvedValueOnce({
            data: {
                message :'User Saved'
            }
        }).mockResolvedValueOnce({
            data: {
                id: 1,
                username : 'user1',
                displayname: 'display1',
                image : 'img1.jpg'
            }
        });
         
        fireEvent.click(button);
        const myProfile = await waitForElement(() => queryByText('My Profile'));
        expect( myProfile).toBeInTheDocument();
    });
})