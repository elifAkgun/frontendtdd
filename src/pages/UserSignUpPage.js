import React from 'react';

export class UserSignUpPage extends React.Component {

    state = {
        displayName: '',
        userName: '',
        password: '',
        repeatPassword: ''
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

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <div> <input placeholder="Your Display Name" value={this.state.displayName} onChange={this.onChangeDisplayName}></input></div>
                <div> <input placeholder="Your User Name" value={this.state.userName} onChange={this.onChangeUserName}></input></div>
                <div> <input placeholder="Your Password" type="password" value={this.state.password} onChange={this.onChangePassword}></input></div>
                <div> <input placeholder="Your Repeat Password" type="password" value={this.state.repeatPassword} onChange={this.onChangeRepeatPassword} ></input></div>
                <div> <button>Sign Up</button> </div>
            </div>
        );
    }
}

export default UserSignUpPage;