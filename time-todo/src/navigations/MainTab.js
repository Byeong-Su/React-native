import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalendarView, Todo, Profile, Timer } from '../screens';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { UserContext } from '../contexts';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
  const theme = useContext(ThemeContext);
  return (
    <MaterialIcons
      name={name}
      size={26}
      //활성화 상태에따라 색상 변경
      color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
    />
  );
};

const MainTab = ({ navigation, route }) => {
  const theme = useContext(ThemeContext);
  
  /*로그아웃 위해서 만든 것
  const { dispatch } = useContext(UserContext);
  
  const _handleLogoutButtonPress = async () => {
    try {
      await signout();
    } catch (e) {
      console.log('[Profile] logout: ', e.message);
    } finally {
      dispatch({});
    }
  };*/

  useEffect(() => {
    const title = getFocusedRouteNameFromRoute(route) ?? 'Channels';
    navigation.setOptions({
      headerTitle: title,
      //채널 생성 버튼은 헤더 오른쪽에만 나타나도록
      headerRight: () =>
        title === 'Channels'
        /*로그아웃 위해서
        && (
          <MaterialIcons
            name="add"
            size={26}
            style={{ margin: 10 }}
            onPress={_handleLogoutButtonPress}
          />
        ),*/
    });
  }, [route]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.tabInactiveColor,
      }}
    >
      <Tab.Screen
        name="CalandarView"
        component={CalendarView}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: focused ? 'calendar-view-day' : 'calendar-today',
            }),
        }}
      />
      <Tab.Screen
        name="Todo"
        component={Todo}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: focused ? 'work' : 'work-outline',
            }),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: focused ? 'person' : 'person-outline',
            }),
        }}
      />
      {/*<Tab.Screen
        name="Timer"
        component={Timer}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: focused ? 'person' : 'person-outline',
            }),
        }}
      />  */}  
    </Tab.Navigator>  
  );
};

export default MainTab;