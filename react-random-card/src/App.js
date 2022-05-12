import React from 'react';
import { View } from 'react-native';
import Random from './components/Random';
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
      <Random />
    </View>
  );
};
export default App;