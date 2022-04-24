//3.3.2
//state

import React, {useState} from 'react';
import { View, Text } from 'react-native';
import MyButton from './MyButton';

const Counter = () => {
    //coutn : 숫자의 상태 관리 변수, setCount : 상태 변경 함수, 초기값 0으로 설정
    const [count, setCount] = useState(0);
    //컴포넌트에서 관리해야하는 상태 여러개인 경우 useState여러개 사용
    const [double, setDouble] = useState(0);
  return (
    <View style={{ alignItems: 'center'}}>
        <Text style={{ fontSize: 30, margin: 10 }}>count: {count}</Text>
        <Text style={{ fontSize: 30, margin: 10 }}>double: {double}</Text>
        {/*현재값에서 1,2 증가*/}
        <MyButton title="+1" onPress={() => {setCount(count + 1); setDouble(double + 2); }} />
        {/*현재값에서 1,2 감소*/}
        <MyButton title="-1" onPress={() => {setCount(count - 1); setDouble(double - 2); }} />
    </View>     
  );
}

export default Counter;