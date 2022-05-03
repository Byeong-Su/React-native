import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import List from '../screens/List';
import Item from '../screens/Item';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Home"
            //배경화면 검은색으로(cardStyle: 스택 네비게이션의 화면 배경색 수정)
            screenOptions={{
                cardStyle: { backgroundColor: '#ffffff' },
                //타이틀 스타일 지정
                headerStyle: {
                    height: 110,
                    backgroundColor: '#95a5a6',
                    borderBottomWidth: 5,
                    borderBottomColor: '#34495e',
                },
            headerTitleStyle: { color: '#ffffff', fontSize: 24 },
            headerTitleAlign: 'center',
            headerTitle: ({ style }) => (
                <MaterialCommunityIcons name="react" style={style} />
            ),
        }}
        >
            { /*자식 컴포넌트로 screen, screen의 name은 반드시 서로 다른 값 */ }
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}/>
            <Stack.Screen
                name="List"
                component={List}
                options={{ headerTitle: 'List Screen',
                headerBackTitleVisible: true,
                //이전버튼 이름 설정
                headerBackTitle: 'Prev',
                //이전버튼, 타이틀 색깔 설정
                headerTitleStyle: { fontSize: 24 },
                headerTintColor: '#e74c3c',
                headerBackImage: ({ tintColor }) => {
                    const style = {
                        marginRight: 5,
                        marginLeft: Platform.OS === 'ios' ? 11 : 0,
                    };
                    return (
                        <MaterialCommunityIcons
                            name="keyboard-backspace"
                            size={30}
                            color={tintColor}
                            style={style}
                        />
                    );
                },
                }}
            />
            <Stack.Screen name="Detail" component={Item} />
        </Stack.Navigator>
    );
};

export default StackNavigation;