import React from 'react';
import { Route, Switch } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import UserSignupPage from '../pages/UserSignupPage'
import UserPage from '../pages/UserPage'
import TopBar from '../components/TopBar'


function App() {
  return (
    <div>
      <TopBar></TopBar>
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/signup" component={UserSignupPage}></Route>
          <Route path="/:username" component={UserPage}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
