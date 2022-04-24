//3.1.1
//Fragment 컴포넌트
//여러개의 컴포넌트를 반환하고 싶을 경우 사용
import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { Text } from 'react-native';

export default function App() {
	return {
		<Fragment>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style="auto" />
		</Fragment>
	);
}