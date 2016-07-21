export function setState(entry) {
  return {
    type: 'SET_STATE',
    entry
  };
};

export function vote(entry) {
  return {
    meta: {remote: true},
    type: 'VOTE',
    entry
  };
};
