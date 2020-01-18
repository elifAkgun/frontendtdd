import React from 'react';

export class UserSignUpPage extends React.Component {

    state = {
        displayName: '',
        userName: '',
        password: '',
        repeatPassword: '',
        pendingApiCall: false
    };

    onChangeDisplayName = (event) => {
        const value = event.target.value;
        this.setState({ displayName: value })
    }

    onChangeUserName = (event) => {
        const value = event.target.value;
        this.setState({ userName: value })
    }

    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({ password: value })
    }

    onChangeRepeatPassword = (event) => {
        const value = event.target.value;
        this.setState({ repeatPassword: value })
    }

    onClickSignUp = () => {

        const user = {
            userName: this.state.userName,
            password: this.state.password,
            displayName: this.state.displayName
        };

        this.setState({ pendingApiCall: true });
        if (this.props.actions) {
            this.props.actions.postSignup(user)
                .then(response => {
                    this.setState({ pendingApiCall: false });
                })
                .catch((error) => {
                    this.setState({ pendingApiCall: false });
                })
                ;

        }
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center"> Sign Up</h1>
                <div className="col-12 mb-3">
                    <label>Display Name</label>
                    <input className="form-control" placeholder="Your Display Name" value={this.state.displayName} onChange={this.onChangeDisplayName}></input>
                </div>
                <div className="col-12 mb-3">
                    <label>User Name</label>
                    <input className="form-control" placeholder="Your User Name" value={this.state.userName} onChange={this.onChangeUserName}></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Password</label>
                    <input className="form-control" placeholder="Your Password" type="password" value={this.state.password} onChange={this.onChangePassword}></input>
                </div>
                <div className="col-12 mb-3">
                    <label>Repat Password</label>
                    <input className="form-control" placeholder="Your Repeat Password" type="password" value={this.state.repeatPassword} onChange={this.onChangeRepeatPassword} ></input>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={this.onClickSignUp} disabled={this.state.pendingApiCall}>
                        {this.state.pendingApiCall && (
                            <div className="spinner-border">
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                        Sign Up
                        </button>
                </div>
            </div>
        );
    }
}

export default UserSignUpPage;