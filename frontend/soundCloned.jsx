const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/app');
const Modal = require('react-modal');
const LoginForm = require('./components/login_form');
const LoginPlaceholder = require('./components/login_placeholder');
const SignupForm = require('./components/signup_form');
const TracksIndex = require('./components/tracks_index');
const UserProfile = require('./components/profile.jsx');
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');
import { Router, Route, IndexRoute, hashHistory} from "react-router";

//***********************************************
window.CommentApiUtil = require('./util/comment_api_util');
//***********************************************

const _ensureLoggedIn = function(nextState, replace){
  if (!SessionStore.isUserLoggedIn()){
    replace("/login");
  }
};

const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={ App } >
      <IndexRoute component = { TracksIndex }/>
      <Route path="/login" component={ LoginPlaceholder }/>
      <Route path="/users/url/:customUrl" component={ UserProfile } onEnter={ _ensureLoggedIn} />
    </ Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  SessionActions.receiveCurrentUser(window.currentUser);
  Modal.setAppElement(document.body);
  ReactDOM.render(appRouter, document.getElementById('content'));
});
