import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserSignUpPage } from './UserSignUpPage';

beforeEach(cleanup);

describe('UserSignUpPage', () => {

    describe('Layout', () => {
        it('has header of Sign Up', () => {
            const { container } = render(<UserSignUpPage />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');
        });

        it('has input for display name', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />);
            const displayNameInput = queryByPlaceholderText('Your Display Name');
            expect(displayNameInput).toBeInTheDocument();
        });

        it('has input for user name', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />);
            const userNameInput = queryByPlaceholderText('Your User Name');
            expect(userNameInput).toBeInTheDocument();
        });

        it('has input for password', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />);
            const passwordInput = queryByPlaceholderText('Your Password');
            expect(passwordInput).toBeInTheDocument();
        });

        it('has password type for password input', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />);
            const passwordInput = queryByPlaceholderText('Your Password');
            expect(passwordInput.type).toBe("password");
        });

        it('has input for password repeat', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />);
            const passwordRepeatInput = queryByPlaceholderText('Your Repeat Password');
            expect(passwordRepeatInput).toBeInTheDocument();
        });

        it('has submit button', () => {
            const { container } = render(<UserSignUpPage />);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        });

    });

    describe('Interactions', () => {

        const changeEvent = (content)=>{
            return {
                target: {
                    value: content
                }
            }
        };

        it('sets the display name value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />);
            const displayNameInput = queryByPlaceholderText('Your Display Name');


            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            expect(displayNameInput).toHaveValue('my-display-name');
        });

        it('sets the user name value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />);
            const userNameInput = queryByPlaceholderText('Your User Name');
           
            fireEvent.change(userNameInput, changeEvent('my-user-name'));
            expect(userNameInput).toHaveValue('my-user-name');
        });

        it('sets the password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />);
            const passwordInput = queryByPlaceholderText('Your Password');

            fireEvent.change(passwordInput, changeEvent('my-passwoP3rd'));
            expect(passwordInput).toHaveValue('my-passwoP3rd');
        });

        it('sets the repeat password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />);
            const repeatPasswordInput = queryByPlaceholderText('Your Repeat Password');

            fireEvent.change(repeatPasswordInput, changeEvent('my-passwoP3rd'));
            expect(repeatPasswordInput).toHaveValue('my-passwoP3rd');
        });
    });
});