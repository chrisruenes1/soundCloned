const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/app');
const LoginForm = require('./components/login_form');
const TracksIndex = require('./components/tracks_index');
import { Router, Route, IndexRoute, hashHistory} from "react-router";


const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={ App } >
      <IndexRoute component = { TracksIndex } />
      <Route path="/login" component={ LoginForm } />
      <Route path="/signup" component={ LoginForm } />
    </ Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(appRouter, document.getElementById('content'));
});
