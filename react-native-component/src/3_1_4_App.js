//3.1.4
//null
//null은 허용되나 undefined은 오류발생(동작이 안됨)
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
	return null;
	//return undefined;	//오류발생
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