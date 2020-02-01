import React from 'react';
import { Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import SignUp from '../pages/UserSignUpPage'
import UserPage from '../pages/UserPage'
import TopBar from '../components/TopBar'
import * as apiCalls from '../api/apiCalls'


const actions = {
  postLogIn : apiCalls.login,
  postSignup: apiCalls.signUp
};

function App() {
  return (
    <div>
      <TopBar></TopBar>
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/login" component={(props) => <LoginPage {...props} actions = {actions}></LoginPage>}></Route>
          <Route path="/signup" component={(props) => <SignUp {...props} actions = {actions}></SignUp>}></Route>
          <Route path="/:username" component={UserPage}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
