import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Todo } from '../screens';

const Stack = createStackNavigator();

const MainStack = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.background },
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Todo" component={Todo} />
    </Stack.Navigator>
  );
};

export default MainStack;