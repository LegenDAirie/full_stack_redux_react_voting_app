import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import Results from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', () => {

  it('renders entries with vote count or zero', () => {
    const pair = List.of('movie1', 'movie2');
    const tally = Map({'movie1': 5});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [train, days] = entries.map( e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(train).to.contain('movie1');
    expect(train).to.contain('5');
    expect(days).to.contain('movie2');
    expect(days).to.contain('0');
  });
});