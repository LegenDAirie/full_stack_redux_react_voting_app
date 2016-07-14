import {expect} from 'chai';
import {List, Map} from 'Immutable';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('movie1', 'movie2');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('movie1', 'movie2')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['movie1', 'movie2'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('movie1', 'movie2')
      }));
    });
  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('movie1', 'movie2', 'movie3')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('movie1', 'movie2')
        }),
        entries: List.of('movie3')
      }));
    });
  });

  describe('vote', () => {

    it('creates a tally for the vote entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('movie1', 'movie2'),
        }),
        entries: List()
      });

      const nextState = vote(state, 'movie1');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('movie1', 'movie2'),
          tally: Map({
            'movie1': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to exsisting tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('movie1', 'movie2'),
          tally: Map({
            'movie1': 3,
            'movie2': 2
          })
        }),
        entries: List()
      });

      const nextState = vote(state, 'movie1');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('movie1', 'movie2'),
          tally: Map({
            'movie1': 4,
            'movie2': 2
          })
        }),
        entries: List()
      }));
    });

  });

});
