import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Timer } from '../screens';

const Stack = createStackNavigator();

const TimerStack = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Timer"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.background },
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Timer" component={Timer} />
      
      {/*
      <Stack.Screen name="Timer" component={Timer}
        //헤더 렌더링x
        options={{ headerShown: false }}
      />
      */}
    </Stack.Navigator>
  );
};

export default TimerStack;