import {expect} from 'chai';
import {List, Map} from 'Immutable';

describe('immutability', () => {

  describe('a tree', () => {

    function addMovie(state, movie) {
      return state.update(
        'movies',
        movies => movies.push(movie)
      );
    };

    it('is immutable', () => {
      const state = Map({
        movies: List.of(
          'movie1',
          'movie2'
        )
      });

      const nextState = addMovie(state, 'movie3');

      expect(state).to.equal(Map({
        movies: List.of('movie1', 'movie2')
      }));

      expect(nextState).to.equal(Map({
        movies: List.of('movie1', 'movie2', 'movie3')
      }));
    });
  });
});
