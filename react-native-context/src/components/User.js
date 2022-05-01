import React, { useContext } from 'react';
import styled from 'styled-components/native';
import UserContext, { UserConsumer } from '../contexts/User';

const StyledText = styled.Text`
  font-size: 24px;
  margin: 10px;
`;

// 7.2.3. Context 수정하기
const User = () => {
  return (
    <UserConsumer>
      {({ user }) => <StyledText>Name: {user.name}</StyledText>}
    </UserConsumer>
  );
};

/*
const User = () => {
    return (
        자식 컴포넌트 중 Provider 컴포넌트 있으면 이후 자식은 중간의 Provier컴포넌트 전달값 사용
        즉, 젤 가까운 전달값 사용
        <UserContext.Provider value={{ name: 'React Native' }}>
            Consumer 컴포넌트의 자식은 반드시 리액트 컨포넌트를 반환하는 함수
            <UserContext.Consumer>
                {value => <StyledText>Name: {value.name}</StyledText>}
            </UserContext.Consumer>
        </UserContext.Provider>
    );
};
*/

export default User;