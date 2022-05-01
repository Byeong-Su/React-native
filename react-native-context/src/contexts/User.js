import React, { createContext, useState } from 'react';

const UserContext = createContext({
  user: { name: '' },
  dispatch: () => {},
});

//기존Provider 컴포넌트와 달리 데이터를 변경할 수 있는 함수도 함께 전달
const UserProvider = ({ children }) => {
    const [name, setName] = useState('Byeong Su');
  
    const value = { user: { name }, dispatch: setName };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
  
const UserConsumer = UserContext.Consumer;
  
export { UserProvider, UserConsumer };
export default UserContext;