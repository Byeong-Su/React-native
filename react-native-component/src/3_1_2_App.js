//3.1.2
//자바스크립트 변수 사용
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
	const name = 'ByeongSu';
	return {
		<View style={styles.container}>
			<Text style={styles.title}>My name is {name}</Text>
			<StatusBar style="auto" />
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

export default App;