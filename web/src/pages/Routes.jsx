import React        from 'react';
import {Route}      from 'react-router';
import App          from './App.jsx';
import Home         from './Home.jsx';
import Login        from './Login.jsx';
import Signup       from './Signup.jsx';
import SignupStatus from './SignupStatus.jsx';
import Profile      from '../objects/Profile/Profile.jsx';
import Movie        from '../objects/Movie/Movie.jsx';
import Action       from '../objects/Action/Action.jsx';
import Person       from '../objects/Person/Person.jsx';

export default class Routes extends React.Component {
  render() {
    return (
      <App>
        <Route exact path="/"        component={Home}/>
        <Route path="/movie/:id"     component={Movie}/>
        <Route path="/action/:id"    component={Action}/>
        <Route path="/person/:id"    component={Person}/>
        <Route path="/login"         component={Login}/>
        <Route path="/signup"        component={Signup}/>
        <Route path="/signup-status" component={SignupStatus}/>
        <Route path="/profile"       component={Profile}/>
      </App>
    );
  }
}

Routes.displayName = 'Routes';
