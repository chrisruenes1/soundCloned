const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/app');
const LoginForm = require('./components/login_form');
const SignupForm = require('./components/signup_form');
const TracksIndex = require('./components/tracks_index');
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');
import { Router, Route, IndexRoute, hashHistory} from "react-router";

const _ensureLoggedIn = function(nextState, replace){
  if (!SessionStore.isUserLoggedIn()){
    replace("/login");
  }
};

const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={ App } >
      <IndexRoute component = { TracksIndex } onEnter={ _ensureLoggedIn}/>
      <Route path="/login" component={ LoginForm } />
      <Route path="/signup" component={ SignupForm } />
    </ Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  SessionActions.receiveCurrentUser(window.currentUser);
  ReactDOM.render(appRouter, document.getElementById('content'));
});
