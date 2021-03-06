import React from 'react';
import Input from '../components/Input'
import ButtonWithProgress from '../components/ButtonWithProgress'
import { connect } from 'react-redux';
import * as authActions from '../redux/authActions'

export class UserSignupPage extends React.Component {

    state = {
        displayName: '',
        username: '',
        password: '',
        repeatPassword: '',
        pendingApiCall: false,
        errors: {},
        passwordRepeatConfirmed: true
    };

    onChangeDisplayName = (event) => {
        const value = event.target.value;
        const errors = { ...this.state.errors };
        delete errors.displayName;
        this.setState({ displayName: value, errors })
    }

    onChangeUserName = (event) => {
        const value = event.target.value;
        const errors = { ...this.state.errors };
        delete errors.username;
        this.setState({ username: value, errors })
    }

    onChangePassword = (event) => {
        const value = event.target.value;
        const passwordRepeatConfirmed = this.state.repeatPassword === value;
        const errors = { ...this.state.errors };
        delete errors.password;
        errors.repeatPassword = passwordRepeatConfirmed ? '' : 'Does not match to password';
        this.setState({ password: value, passwordRepeatConfirmed, errors })
    }

    onChangeRepeatPassword = (event) => {
        const value = event.target.value;
        const passwordRepeatConfirmed = this.state.password === value;
        const errors = { ...this.state.errors };
        delete errors.repeatPassword;
        errors.repeatPassword = passwordRepeatConfirmed ? '' : 'Does not match to password';
        this.setState({ repeatPassword: value, passwordRepeatConfirmed, errors });
    }

    onClicksignup = () => {

        const user = {
            username: this.state.username,
            password: this.state.password,
            displayName: this.state.displayName
        };

        this.setState({ pendingApiCall: true });
        this.props.actions.postsignup(user)
            .then((response) => {
                this.setState({ pendingApiCall: false }, () => 
                    this.props.history.push('/')
                );
            })
            .catch((apiError) => {
                let errors = { ...this.state.errors }
                if (apiError.response && apiError.response.data && apiError.response.data.validationErrors) {
                    errors = { ...apiError.response.data.validationErrors }
                }
                this.setState({ pendingApiCall: false, errors });
            })
            ;

        
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Sign Up</h1>
                <div className="col-12 mb-3">
                    <Input label="Display Name"
                        hasError={this.state.errors.displayName && true}
                        error={this.state.errors.displayName}
                        placeholder="Your Display Name"
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName}>
                    </Input>
                </div>

                <div className="col-12 mb-3">
                    <Input label="User Name"
                        hasError={this.state.errors.username && true}
                        error={this.state.errors.username}
                        placeholder="Your User Name"
                        value={this.state.username} onChange={this.onChangeUserName}>
                    </Input>
                </div>
                <div className="col-12 mb-3">
                    <Input label="Password"
                        hasError={this.state.errors.password && true}
                        error={this.state.errors.password}
                        placeholder="Your Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}>
                    </Input>
                </div>
                <div className="col-12 mb-3">
                    <Input label="Repeat Password"
                        hasError={this.state.errors.repeatPassword && true}
                        error={this.state.errors.repeatPassword}
                        placeholder="Your Repeat Password"
                        type="password" value={this.state.repeatPassword}
                        onChange={this.onChangeRepeatPassword} >
                    </Input>
                </div>
                <div className="text-center">

                    <ButtonWithProgress onClick={this.onClicksignup}
                        disabled={this.state.pendingApiCall || !this.state.passwordRepeatConfirmed}
                        pendingApiCall={this.state.pendingApiCall}
                        text="Sign Up">
                    </ButtonWithProgress>


                </div>
            </div>
        );
    }
}


UserSignupPage.defaultProps = {
    actions: {
        postsignup: () =>
            new Promise((resolve, reject) =>
                resolve({}))
    },
    history: {
        push: () => { }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            postsignup: (user) => dispatch(authActions.signupHandler(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(UserSignupPage); 