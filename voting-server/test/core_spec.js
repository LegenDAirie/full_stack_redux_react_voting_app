import {expect} from 'chai';
import {List, Map} from 'immutable';
import {setEntries} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const STATE = Map();
      const ENTRIES =  List.of('Trainspotting', '28 Days Later');
      const NEXTSTATE = setEntries(STATE, ENTRIES);
      expect(NEXTSTATE).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });

    it('converts to immutable', () => {
      const STATE = Map();
      const ENTRIES = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(STATE, ENTRIES);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });
  });
});
