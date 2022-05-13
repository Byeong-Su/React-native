import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MyButton from './MyButton';
import { images } from '../images';
import Icon from './Icon';

const Random = () => {
  const number_arr=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
  const [number, setNumber] = useState(0);

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 30, margin: 10 }}>number: {number}</Text>
      <Icon type={images.diamond} />
      <MyButton
        title="CARD DRAW"
        onPress={() => {
          //if( (Math.floor(Math.random() * 4) + 0)=== )
          setNumber(number_arr[Math.floor(Math.random() * 13) + 0]);
        }}
      />
      <MyButton
        title="RESET"
        onPress={() => {
          setNumber(0);
        }}
      />
    </View>
  );
};

export default Random;

/*
import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
 
export default class MyProject extends Component {
 
  constructor(){
 
    super();
 
    this.state={
 
      // This is our Default number value
      NumberHolder : 1
 
    }
  }
 
GenerateRandomNumber=()=>
{
 
var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
 
this.setState({
 
  NumberHolder : RandomNumber
 
})
}
 
  render() {
    return (
   
      <View style={styles.MainContainer} >
 
       <Text style={{marginBottom: 10, fontSize: 20}}>{this.state.NumberHolder}</Text>
 
       <Button title="Generate Random Number" onPress={this.GenerateRandomNumber} />
        
      </View>
 
    );
  }
}
 
const styles = StyleSheet.create(
{
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});*/