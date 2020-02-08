import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import  TopBar from './TopBar';
import {MemoryRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import authReducer from '../redux/authReducer'

const defaultState = {
    id: 1,
    username: 'user1',
    displayname: 'dis1',
    image: 'img1.jpg',
    password: '12345 ',
    isLoggedIn: false
}

const loggedInState = {
    id: 1,
    username: 'user1',
    displayname: 'dis1',
    image: 'img1.jpg',
    password: '12345 ',
    isLoggedIn: true
}

const setup = (state=defaultState )=>{
    const store = createStore(authReducer,state);
    return render(
        <Provider store={store}>
        <MemoryRouter>
            <TopBar></TopBar>
        </MemoryRouter>
        </Provider>
    );
};

describe('Top Bar', () => {
    describe('Layout', () => {
        it('has application logo', () => {
           const {container} =  setup();
           const image = container.querySelector('img');
           expect(image.src).toContain('tdd-cloud-logo.png');
        });
        it('has link to home from logo', () => {
            const {container} =  setup();
            const image = container.querySelector('img');
            expect(image.parentElement.getAttribute('href')).toBe('/');
         });

         it('has link to signup', () => {
            const {queryByText} =  setup();
            const signup = queryByText('Sign Up');
            expect(signup).toBeInTheDocument();
         });
         it('has link to login', () => {
            const {queryByText} =  setup();
            const logout = queryByText('Log In');
            expect(logout).toBeInTheDocument();
         });

         it('display topbar when url is / ', () => {
            const {container} =  setup('/');
            const navigation = container.querySelector('nav')
            expect(navigation).toBeInTheDocument();
         }); 

         it('display topbar when url is /login ', () => {
            const {container} =  setup('/login');
            const navigation = container.querySelector('nav')
            expect(navigation).toBeInTheDocument();
         }); 

         it('display topbar when url is /signup ', () => {
            const {container} =  setup('/signup');
            const navigation = container.querySelector('nav')
            expect(navigation).toBeInTheDocument();
         }); 

         it('display topbar when url is /user1 ', () => {
            const {container} =  setup('/user1');
            const navigation = container.querySelector('nav')
            expect(navigation).toBeInTheDocument();
         }); 

         it('has link to logout when user logged in', () => {
            const {queryByText} =  setup(loggedInState);
            const loggoutLink = queryByText('Logout');
            expect(loggoutLink).toBeInTheDocument();
         }); 

         it('has link to user profile when user logged in', () => {
            const {queryByText} =  setup(loggedInState);
            const profileLink = queryByText('My Profile')
            expect(profileLink.getAttribute('href')).toBe('/user1');
         }); 
       

    })

    describe('Interactions', ()=>{
        it('displays the login and signup when user clicks logout',()=> {
            const {queryByText} =  setup(loggedInState);
            const logoutLink = queryByText('Logout')
            fireEvent.click(logoutLink);
            const login = queryByText('Log In');
            expect(login).toBeInTheDocument();

            const signup = queryByText('Sign Up');
            expect(signup).toBeInTheDocument();
        })
    
    })
})