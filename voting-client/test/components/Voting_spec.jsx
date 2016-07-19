import Voting from "../../src/components/Voting";
import React from 'React';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {List} from 'immutable';
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

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={['movie1', 'movie2']}
      vote={vote}/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.eq('movie1');
  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={['movie1', 'movie2']}
        hasVoted="movie1" />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds labels to the voted entry', () => {
    const component = renderIntoDocument(
      <Voting pair={['movie1', 'movie2']}
        hasVoted="movie1" />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting winner="movie1" />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('movie1');
  });

  it('renders as a pure component', () => {
    const pair = ['movie1', 'movie2'];
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('movie1');

    pair[0] = 'movie3';
    component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('movie1');
  });

  it('does update the DOM when props change', () => {
    const pair = List.of('movie1', 'movie2');
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('movie1');

    const newPair = pair.set(0, 'movie3');
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    );

    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('movie3');
  });

});
