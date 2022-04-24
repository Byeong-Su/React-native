//3.4.2 change이벤트

import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const EventInput = () => {
    const [text, setCount] = useState('');
    const _onChange = event => setText(event.nativeEvent.text);

    return (
        <View>
          <Text style={{ margin: 10, fontSize: 30}}>text: {text}</Text>
          <TextInput
           style={{ borderWidth:1, padding: 10, fontSize: 20 }}
           placeholder="Enter a text..."
           //TextInput 컴포넌트에 입력된 텍스트가 변경될때 호출
           onChange={_onChange}
          />
        </View>     
    );
};

export default EventInput;