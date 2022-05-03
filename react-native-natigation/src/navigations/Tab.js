import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Mail, Meet, Settings } from '../screens/TabScreens';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabIcon = ({ name, size, color }) => {
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
}
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="Settings"
            tabBarOptions={{
                labelPosition: 'beside-icon',
                showLabel: false,
                style: {
                    backgroundColor: '#54b7f9',
                    borderTopColor: '#ffffff',
                    borderTopwidth: 2,
                },
                activeTintColor: '#ffffff',
                inactiveTintColor: '#cfcfcf',
            }}
        >
            <Tab.Screen
                name="Mail"
                component={Mail}
                options={{
                    tabBarLabel: 'Inbox',
                    tabBarIcon: props => TabIcon({
                        ...props,
                        name: props.focused ? 'email' : 'email-outline',
                    }),
                }}
            />
            <Tab.Screen
                name="Meet"
                component={Meet}
                options={{
                    tabBarIcon: props =>
                    TabIcon({
                        ...props,
                        name: props.focused ? 'video' : 'video-outline',
                    }),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}options={{
                    tabBarIcon: props =>
                    TabIcon({
                        ...props,
                        name: props.focused ? 'settings' : 'settings-outline',
                    }),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;