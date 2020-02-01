import React from 'react';
import Input from '../components/Input'
import ButtonWithProgress from '../components/ButtonWithProgress'


export class LoginPage extends React.Component {

    state = {
        username: '',
        password: '',
        apiError: undefined,
        pendingApiCall: false
    };

    onChangeUserName = (event) => {
        const value = event.target.value;
        this.setState({ username: value, apiError: undefined })
    }

    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({ password: value, apiError: undefined })
    }


    onClickLogIn = () => {
        const user = {
            username: this.state.username,
            password: this.state.password
        };

        this.setState({ pendingApiCall: true });

        this.props.actions.postLogIn(user)
            .then(response => {
                this.setState({ pendingApiCall: false }, () => {
                    this.props.history.push('/');
                })

            }).catch(error => {
                if (error.response) {
                    this.setState({ apiError: error.response.data.message })
                }
                this.setState({ pendingApiCall: false });
            });
    }

    render() {

        let buttonDisabled = false;

        if (this.state.username === '')
            buttonDisabled = true;
        else if (this.state.password === '')
            buttonDisabled = true;

        return (
            <div className="container">
                <h1 className="text-center">Log In</h1>

                <div className="col-12 mb-3">
                    <Input label="User Name"
                        placeholder="Your User Name"
                        value={this.state.username}
                        onChange={this.onChangeUserName}>
                    </Input>
                </div>

                <div className="col-12 mb-3">
                    <Input label="Password"
                        placeholder="Your Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}>
                    </Input>
                </div>
                {
                    this.state.apiError &&
                    <div className="col-12 mb-3">
                        <div className="alert alert-danger" role="alert">
                            {this.state.apiError}
                        </div>
                    </div>
                }

                <div className="text-center">
                    <ButtonWithProgress onClick={this.onClickLogIn}
                        disabled={this.state.pendingApiCall || buttonDisabled}
                        pendingApiCall={this.state.pendingApiCall}
                        text="Log In">
                    </ButtonWithProgress>
                </div>
            </div>

        )
    }
}

LoginPage.defaultProps = {
    actions: {
        postLogIn: () => new Promise((resolve, reject) => resolve({}))
    }
};

export default LoginPage;