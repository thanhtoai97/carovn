export const setMode = (mode, initialPace) => {
  return {
    type: 'SET_MODE',
    mode,
    initialPace
  };
};
export const setPace = pace => {
  return {
    type: 'SET_PACE',
    pace
  };
};
export const setVs = vs => {
  return {
    type: 'SET_VS',
    vs
  };
};
export const setDiff = diff => {
  return {
    type: 'SET_DIFFICULTY',
    diff
  };
};

export const setStarter = starter => {
  return {
    type: 'SET_STARTER',
    starter
  };
};
