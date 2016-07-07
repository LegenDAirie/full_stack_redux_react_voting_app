import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

  describe("a map", () => {

    function addMovie(state, movie) {
      return state.update('movies', movies => movies.push(movie));
    };

    it('is immutable', () => {
      let state = Map({
        movies: List.of('movie1', 'movie2')
      });

      let nextState = addMovie(state, 'movie3');

      expect(state).to.equal(Map({
        movies: List.of('movie1', 'movie2')
      }));

      expect(nextState).to.equal(Map({
        movies: List.of('movie1', 'movie2', 'movie3')
      }));
    });
  });
});
