import React from 'react';
import { Text, View } from 'react-native';
import EventButton from './components/EventButton';
import EventInput from './components/EventInput';

const App = () => {
  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <EventButton />
      <EventInput />
    </View>
  );
};

export default App;