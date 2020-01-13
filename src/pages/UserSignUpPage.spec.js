import React from 'react';
import { render, cleanup, fireEvent, queryByPlaceholderText, waitForDomChange } from '@testing-library/react';
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

        const changeEvent = (content) => {
            return {
                target: {
                    value: content
                }
            }
        };

        let displayNameInput, userNameInput, passwordInput, repeatPasswordInput, button;

        const setUpForSubmit = (props) => {
            const rendered = render(
                <UserSignUpPage {...props} />
            );

            const { container, queryByPlaceholderText } = rendered;
            displayNameInput = queryByPlaceholderText('Your Display Name');
            userNameInput = queryByPlaceholderText('Your User Name');
            passwordInput = queryByPlaceholderText('Your Password');
            repeatPasswordInput = queryByPlaceholderText('Your Repeat Password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(userNameInput, changeEvent('my-user-name'));
            fireEvent.change(passwordInput, changeEvent('my-passwoP3rd'));
            fireEvent.change(repeatPasswordInput, changeEvent('my-passwoP3rd'));
            button = container.querySelector('button');

            return rendered;
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

        it('calls post signup when the fields are valid and the actions are provided in props ', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            };

            setUpForSubmit({ actions });
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });

        it('it does not throw any exception when the button click with empty form', () => {
            setUpForSubmit();
            fireEvent.click(button);
            expect(() => fireEvent.click(button)).not.toThrow();
        });

        it('calls post signup when the fields are valid and the actions are provided in props ', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            };

            setUpForSubmit({ actions });
            fireEvent.click(button);

            const expectedUser = {
                username: 'my-user-name',
                password: 'my-passwoP3rd',
                displayName: 'my-display-name'
            };

            expect(actions.postSignup).toHaveBeenCalledWith(expectedUser);
        });

        it('does not allow to the user to click sign up button when there is an ongoing api call', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            };
            setUpForSubmit({ actions });

            fireEvent.click(button);
            fireEvent.click(button);

            expect(actions.postSignup).toHaveBeenCalledTimes(1);


        });

        it('has spinner to the user to click sign up button when there is an ongoing api call', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            };
            const { queryByText } = setUpForSubmit({ actions });

            fireEvent.click(button);
            const spinner = queryByText('Loading...');

            expect(spinner).toBeInTheDocument();


        });

        it('hide spinner after api call successfully', async () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            };

            const { queryByText } = setUpForSubmit({ actions });
            fireEvent.click(button);

            await waitForDomChange();

            const spinner = queryByText('Loading...');

            expect(spinner).not.toBeInTheDocument();
        });

        it('hide spinner after api call with an error', async () => {
            const actions = {
                postSignup: jest.fn().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            reject({
                                response: { data: {} }
                            });
                        }, 300);
                    });
                })
            };

            const { queryByText } = setUpForSubmit({ actions });
            fireEvent.click(button);

            await waitForDomChange();

            const spinner = queryByText('Loading...');

            expect(spinner).not.toBeInTheDocument();
        });
    });
});