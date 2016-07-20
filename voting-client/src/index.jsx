import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';
import Voting from './components/Voting';
import Results from './components/Results';

const pair = ['movie1', 'movie2'];

const routes = <Route component={App}>
  <Route path="/results" component={Results} />
  <Route path="/" component={Voting} />
</Route>;

ReactDom.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('app')
  // <Voting pair={pair} winner="Trainspotting" />,
);
