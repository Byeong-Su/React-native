import React, { useContext } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from '../theme';
import { Button, Input, Task } from '../components';
import { singOut } from '../utils/firebase';
import { UserContext } from '../contexts';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;
const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 20px;
`;
const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const Todo = () => {
  const { dispatch } = useContext(UserContext);

  const _handleLogoutButtonPress = async () => {
    try {
      await singOut();
    } catch (e) {
      console.log('[Profile] logout: ', e.message);
    } finally {
      dispatch({});
    }
  };

  return (
    <Container>
      <Button title="signout" onPress={_handleLogoutButtonPress} />
    </Container>
  );
};

export default Todo;