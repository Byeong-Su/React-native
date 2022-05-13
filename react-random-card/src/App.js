import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import Random from './components/Random';

const Container = styled.SafeAreaView`
  flex: 1;
  backgroundColor: '#fff',
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  align-items: center;
  margin: 0px 20px;
`;

export default function App() {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'#101010'}
      />
      <Title>Random Card</Title>
      <Random />
    </Container>
  );
}


/*
import React from 'react';
import { View } from 'react-native';
import Random from './components/Random';
import { images } from './images';
import Icon from './components/Icon';


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
      <Icon type={images.diamond} />
      <Random />
    </View>
  );
};
export default App;*/