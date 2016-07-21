export function setState(entry) {
  return {
    type: 'SET_STATE',
    entry
  };
};

export function vote(entry) {
  return {
    type: 'VOTE',
    entry
  };
};
