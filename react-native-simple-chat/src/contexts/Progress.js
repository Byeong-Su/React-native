import React, { useState, createContext } from 'react';

//createContext로 Context생성
const ProgressContext = createContext({
  inProgress: false,
  spinner: () => {},
});

const ProgressProvider = ({ children }) => {
  //Spinner 컴포넌트의 렌더링 상태를 관리할 상태 변수
  const [inProgress, setInProgress] = useState(false);  
  //상태를 변경할 수 있는 함수
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