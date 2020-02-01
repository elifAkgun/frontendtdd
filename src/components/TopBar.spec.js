import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import  TopBar from './TopBar';
import {MemoryRouter} from 'react-router-dom'

const setup = ()=>{
    return render(
        <MemoryRouter>
            <TopBar></TopBar>
        </MemoryRouter>
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
            const signup = queryByText('Log In');
            expect(signup).toBeInTheDocument();
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


    })
})