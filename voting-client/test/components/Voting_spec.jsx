import Voting from "../../src/components/Voting";
import React from 'React';
import ReactDom from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';


describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={["movie1", "movie2"]} />
    );

    const button = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(button.length).to.equal(2);
    expect(button[0].textContent).to.equal('movie1');
    expect(button[1].textContent).to.equal('movie2');
  });
});
