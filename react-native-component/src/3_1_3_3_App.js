//3.1.3_3
//AND, OR 연산자
//JSX에서 false는 렌더링 안됨
//AND연산자 : 앞의 조건이 참일 때 뒤의 내용이 나타나고, 거짓인 경우에는 나타나지 않음
//OR연산자 : AND의 반대
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
	const name = 'ByeongSu';
	return (
		<View style={styles.container}>
			{name === 'ByeongSu' && (
			  <Text style={styles.text}>My name is ByeongSu</Text>
			)}
			{name !== 'ByeongSu' && (
			  <Text style={styles.text}>My name is not ByeongSu</Text>
			)}
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