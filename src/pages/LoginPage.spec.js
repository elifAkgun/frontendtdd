import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
    describe('Layout', () => {
        it('has header of Login', () => {
            const { container } = render(<LoginPage />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Log In');
        });

        it('has input for user name', () => {
            const { queryByPlaceholderText } = render(<LoginPage />);
            const userNameInput = queryByPlaceholderText('Your User Name');
            expect(userNameInput).toBeInTheDocument();
        });

        it('has input for password', () => {
            const { queryByPlaceholderText } = render(<LoginPage />);
            const password = queryByPlaceholderText('Your Password');
            expect(password).toBeInTheDocument();
        });

        it('has password type for password input', () => {
            const { queryByPlaceholderText } = render(<LoginPage />);
            const passwordInput = queryByPlaceholderText('Your Password');
            expect(passwordInput.type).toBe("password");
        });

        it('has button of Login', () => {
            const { container } = render(<LoginPage />);
            const button = container.querySelector('button');
            expect(button).toHaveTextContent('Log In');
        });

    });

    describe('Interactions', () => {

        let userNameInput, passwordInput, button;

        const changeEvent = (content) => {
            return {
                target: {
                    value: content
                }
            }
        };

        const setUpForSubmit = (props) => {
            const rendered = render(
                <LoginPage {...props} />
            );

            const { container, queryByPlaceholderText } = rendered;
            userNameInput = queryByPlaceholderText('Your User Name');
            passwordInput = queryByPlaceholderText('Your Password');

            fireEvent.change(userNameInput, changeEvent('my-user-name'));
            fireEvent.change(passwordInput, changeEvent('my-passwoP3rd'));
            button = container.querySelector('button');

            return rendered;
        };

        it('sets the username value into the state', () => {
            const { queryByPlaceholderText } = render(<LoginPage />);
            const userNameInput = queryByPlaceholderText('Your User Name');

            fireEvent.change(userNameInput, changeEvent('my-user-name'));
            expect(userNameInput).toHaveValue('my-user-name');
        });

        it('sets the password value into the state', () => {
            const { queryByPlaceholderText } = render(<LoginPage />);
            const userPasswordInput = queryByPlaceholderText('Your Password');

            fireEvent.change(userPasswordInput, changeEvent('my-password'));
            expect(userPasswordInput).toHaveValue('my-password');
        });

        it('calls post log in function when the fields are valid and the actions are provided in props ', () => {
            const actions = {
                postLogIn: jest.fn().mockResolvedValueOnce({})
            };

            setUpForSubmit({ actions });
            fireEvent.click(button);
            expect(actions.postLogIn).toHaveBeenCalledTimes(1);
        });

        it('does not throw exception when clicking the button when actions not provided in props', () => {
            setUpForSubmit({ });
            fireEvent.click(button);
            expect(() => fireEvent.click(button).not.toThrow());
        });

        it('calls postlogin with the credentials in body', () => {
            const actions = {
                postLogIn: jest.fn().mockResolvedValueOnce({})
            };

            setUpForSubmit({ actions });
            fireEvent.click(button);

            const expectedUserObject = {
                username : 'my-user-name',
                password: 'my-passwoP3rd'
            };

            expect(actions.postLogIn).toHaveBeenCalledWith(expectedUserObject);
        });

        it('enables button when the username and the password fields are not empty', () => {  
           setUpForSubmit();
            expect(button).not.toBeDisabled();
        })

        it('disable button when the username empty', () => {  
            setUpForSubmit();
            fireEvent.change(userNameInput, changeEvent(''));
             expect(button).toBeDisabled();
         })

         it('disable button when the password empty', () => {  
            setUpForSubmit();
            fireEvent.change(passwordInput, changeEvent(''));
             expect(button).toBeDisabled();
         })

        it('display alert when login fails', async () => {
            const actions = {
                postLogIn: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            message: 'Login Failed.'
                        }
                    }
                })
            };
            const { queryByText } = setUpForSubmit({ actions });
            fireEvent.click(button);
            const alert = await waitForElement(() => queryByText('Login Failed.'))
            expect(alert).toBeInTheDocument();
        })

        it('clear alert when the user changes username', async () => {
            const actions = {
                postLogIn: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            message: 'Login Failed.'
                        }
                    }
                })
            };
            const { queryByText } = setUpForSubmit({ actions });
            fireEvent.click(button);
            await waitForElement(() => queryByText('Login Failed.'))
            fireEvent.change(userNameInput, changeEvent('new-value-username'));
            
            const alert = queryByText('Login Failed.')
            expect(alert).not.toBeInTheDocument();
        })
    });

    it('does not allow to the user to click login button when there is an ongoing api call', () => {
        const actions = {
            postLogin: jest.fn().mockResolvedValueOnce({})
        };
        setUpForSubmit({ actions });

        fireEvent.click(button);
        fireEvent.click(button);

        expect(actions.postLogin).toHaveBeenCalledTimes(1);


    });

    it('has spinner to the user to click login button when there is an ongoing api call', () => {
        const actions = {
            postLogin: jest.fn().mockResolvedValueOnce({})
        };
        const { queryByText } = setUpForSubmit({ actions });

        fireEvent.click(button);
        const spinner = queryByText('Loading...');

        expect(spinner).toBeInTheDocument();


    });

    it('hide spinner after api call successfully', async () => {
        const actions = {
            postLogin: jest.fn().mockResolvedValueOnce({})
        };

        const { queryByText } = setUpForSubmit({ actions });
        fireEvent.click(button);

        await waitForDomChange();

        const spinner = queryByText('Loading...');

        expect(spinner).not.toBeInTheDocument();
    });

    it('hide spinner after api call with an error', async () => {
        const actions = {
            postLogin: jest.fn().mockImplementation(() => {
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