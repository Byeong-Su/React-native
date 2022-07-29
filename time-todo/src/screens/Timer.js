import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components';
import { BackHandler, Alert } from "react-native";
import styled from 'styled-components/native';
//import { TouchableOpacity } from 'react-native-gesture-handler';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
`;
const Text = styled.Text`
  font-size: 50px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.Text};
`;
/*
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center'
  },
  text: {
    fontSize: 50,
  }
})*/

const Timer = () => {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const increment = useRef(null)

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);  

  const handleStart = () => {
    setIsActive(!isActive)
    {
      !isActive ?
      (increment.current = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 10))
      :
      (clearInterval(increment.current))
    }
  }


  const handleReset = () => {
    clearInterval(increment.current)
    setIsActive(false)
    setTimer(0)
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours}:${getMinutes}.${getSeconds}`
  }
  //마운트시 시,분,초 값 가져와서 표출 및 카운트 시작

  useEffect(() => {
    handleStart();

    return () => handleStart();
  }, []);

  return (
    <Container>
      <Text>{formatTime()}</Text>
      <Button title="Start/Stop" onPress={handleStart}></Button>
      <Button title="Reset" onPress={handleReset}></Button>
      {/*
      <TouchableOpacity onPress={handleStart}>
        <Text style={{ fontSize: 30 }}>{!isActive ? "Start" : "Stop"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset}>
        <Text style={{ fontSize: 30 }}>Reset</Text>
      </TouchableOpacity> 
      */}  
    </Container>
  )
}

export default Timer;