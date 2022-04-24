//3.1.3
//조건문
//같다는 === 로 비교해줘야 함
//제약이 있음, 복잡한 조건문은 JSX 밖에서 처리하는것이 좋다
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
	const name = 'ByeongSu';
	return (
		<View style={styles.container}>
		  <Text style={styles.text}>
			  {(() => {
				if(name === 'Hanbit') return 'My name is Hanbit';
				else if(name === 'ByeongSu') return 'My name is ByeongSu';
				else return 'My name is React Native';
			  })()}
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