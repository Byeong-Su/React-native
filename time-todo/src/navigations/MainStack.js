import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTab from './MainTab';
import { Timer } from '../screens';

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
      <Stack.Screen name="Main" component={MainTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Timer" component={Timer}
        //헤더 렌더링x
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;