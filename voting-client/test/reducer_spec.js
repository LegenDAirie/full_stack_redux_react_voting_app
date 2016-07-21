import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src//reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('movie1', 'movie2'),
          tally: Map({'movie1': 1})
        })
      })
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie1', 'movie2'],
        tally: {movie1: 1}
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['movie1', 'movie2'],
          tally: {movie1: 1}
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie1', 'movie2'],
        tally: {movie1: 1}
      }
    }));
  });

  it('handles SET_STATE without initial value', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['movie1', 'movie2'],
          tally: {movie1: 1}
        }
      }
    };

    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie1', 'movie2'],
        tally: {movie1: 1}
      }
    }));
  });

  it('handles Vote by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['movie1', 'movie2'],
        tally: {movie1: 1}
      }
    });

    const action = {type: 'VOTE', entry: 'movie1'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie1', 'movie2'],
        tally: {movie1: 1}
      },
      hasVoted: 'movie1'
    }));
  });

  it('does not set hasvoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['movie1', 'movie2'],
        tally: {movie1: 1}
      }
    });

    const action = {type: 'VOTE', entry: 'movie3'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie1', 'movie2'],
        tally: {movie1: 1}
      }
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['movie1', 'movie2'],
        tally: {movie1: 1}
      },
      hasVoted: 'movie1'
    });

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['movie3', 'movie4']
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['movie3', 'movie4']
      }
    }));
  });

});
