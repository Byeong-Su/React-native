//3.1.5
//주석
//{/* */} 형태로 사용
//단, 태그 안에서 주석을 사용할 때는 자바스크립트처럼 //나 /* */주석 사용 가능
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
	const name = 'ByeongSu';
	return (
	  <View style={styles.container}>
		  {/* <Text>Comment</Text> */}
		  <Text /* Commnet */>Comment</Text>
		  <Text
		  // Comment
		  >
		    Comment
		</Text>
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