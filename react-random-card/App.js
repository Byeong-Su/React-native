import App from './src/App';

export default App;
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