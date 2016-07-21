import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creator';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

const store = createStore(reducer);

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
  store.dispatch(setState(state))
);

const routes = <Route component={App}>
  <Route path="/results" component={ResultsContainer} />
  <Route path="/" component={VotingContainer} />
</Route>;

ReactDom.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>,
  </Provider>
  document.getElementById('app')
);
