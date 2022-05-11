import React, { useState, createContext } from 'react';

//createContext로 Context생성
const ProgressContext = createContext({
  inProgress: false,
  spinner: () => {},
});

const ProgressProvider = ({ children }) => {
  const [inProgress, setInProgress] = useState(false);
  const spinner = {
    start: () => setInProgress(true),
    stop: () => setInProgress(false),
  };
  const value = { inProgress, spinner };
  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export { ProgressContext, ProgressProvider };