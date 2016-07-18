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

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('movie1', 'movie2'),
          tally: Map({
            'movie1': 4,
            'movie2': 2
          })
        }),
        entries: List.of('movie3', 'movie4', 'movie5')
      });

      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('movie3', 'movie4')
        }),
        entries: List.of('movie5', 'movie1')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('movie1', 'movie2'),
          tally: Map({
            'movie3': 3,
            'movie4': 3
          })
        }),
        entries: List.of('movie3', 'movie4', 'movie5')
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('movie3', 'movie4')
        }),
        entries: List.of('movie5', 'movie1', 'movie2')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('movie1', 'movie2'),
          tally: Map({
            'movie1': 4,
            'movie2': 2
          })
        }),
        entries: List()
      });

      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'movie1'
      }));
    });


  });

  describe('vote', () => {

    it('creates a tally for the vote entries', () => {
      const state = Map({
        pair: List.of('movie1', 'movie2'),
      });

      const nextState = vote(state, 'movie1');

      expect(nextState).to.equal(Map({
        pair: List.of('movie1', 'movie2'),
        tally: Map({
          'movie1': 1
        })
      }));
    });

    it('adds to exsisting tally for the voted entry', () => {
      const state = Map({
        pair: List.of('movie1', 'movie2'),
        tally: Map({
          'movie1': 3,
          'movie2': 2
        })
      });

      const nextState = vote(state, 'movie1');

      expect(nextState).to.equal(Map({
        pair: List.of('movie1', 'movie2'),
        tally: Map({
          'movie1': 4,
          'movie2': 2
        })
      }));
    });

  });

});
