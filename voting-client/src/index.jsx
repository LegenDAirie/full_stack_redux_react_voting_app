import React from 'react';
import ReactDom from 'react-dom';
import {Route} from 'react-router';
import App from './components/App';
import Voting from './components/Voting';

const pair = ['movie1', 'movie2'];

const routes = <Route component={App}>
  <Route path="/" component={Voting} />
</Route>;

ReactDom.render(
  <Voting pair={pair} winner="Trainspotting" />,
  document.getElementById('app')
);
