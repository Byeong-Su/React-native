//3.1.6
//스타일링
//style에 객체형태로 입력
//하이픈으로 연결된 이름은 카멜표기법으로
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
	const name = 'ByeongSu';
	return (
	  <View 
	    style={{
			flex: 1,
			backgroundColor: '#fff',
			alignItems:'center',
			justifyContent: 'center',
		}}
	  >
	    <Text >Open up App.js to start working on your app!</Text>
	  </View>
	);
};

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor: '#ffffff',
	},
	title: {
		fontSize: 30,
	},
});

//export default App;