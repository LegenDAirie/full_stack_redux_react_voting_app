import {expect} from 'chai';
import {Map, fromJS} from 'Immutable';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['movie1']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['movie1']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['movie1', 'movie2']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie1', 'movie2']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['movie1', 'movie2']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'movie1'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie1', 'movie2'],
        tally: {'movie1': 1}
      },
      entries: []
    }));
  });

});
