import React, { useState, createContext } from 'react';

const UserContext = createContext({
  user: { email: null, uid: null },
  dispatch: () => {},
});

const UserProvider = ({ children }) => {
  //사용자의 이메일과 uid를 가진 user객체 생성
  const [user, setUser] = useState({});
  //user 객체를 수정할 수 있는 함수
  const dispatch = ({ email, uid }) => {
    setUser({ email, uid });
  };
  //user객체, 수정할 수 있는 함수를 value로 전달
  const value = { user, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };