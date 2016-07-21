import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  store: {
    vote: {
      pair: ['movie3', 'movie2'],
      tally: {movie3: 2}
    }
  }
});

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
