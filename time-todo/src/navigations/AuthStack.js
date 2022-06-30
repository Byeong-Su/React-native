/*import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, List } from '../screens';

const Stack = createStackNavigator();

const AuthStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Login" >
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="List" component={List} />

    </Stack.Navigator>
  );
};

export default AuthStack;*/

//인증전 렌더링될 화면들
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup } from '../screens';

const Stack = createStackNavigator();

const AuthStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Login"
      /*screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: theme.background },
        headerTintColor: theme.headerTintColor,
      }}*/
    >
      <Stack.Screen
        name="Login"
        component={Login}
        //헤더 렌더링x
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Signup" component={Signup} />

    </Stack.Navigator>
  );
};

export default AuthStack;