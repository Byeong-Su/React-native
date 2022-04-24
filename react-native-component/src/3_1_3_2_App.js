//3.1.3_2
//삼항연산자
//같다는 === 로 비교해줘야 함
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
	const name = 'ByeongSu';
	return (
		<View style={styles.container}>
		  <Text style={styles.text}>
			  My name is {name === 'ByeongSu' ? 'ByeongSu Shon' : 'React Native'}
		  </Text>
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

//export default App;