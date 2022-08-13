import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components';
import { BackHandler, Alert } from "react-native";
import styled from 'styled-components/native';
import { app } from '../utils/firebase';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  doc,
  getDocs,
  setDoc
} from 'firebase/firestore';

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

  //오늘 날짜 설정
  const now = new Date();
  const nowMonth = (now.getMonth()+1) < 10 ? '0'+(now.getMonth()+1).toString() : (now.getMonth()+1).toString();
  const nowDay = (now.getDate) < 10 ? '0'+(now.getDate()).toString() : (now.getDate()).toString();
  const nowFormat = now.getFullYear().toString() + nowMonth + nowDay;

  const db = getFirestore(app);

  const getFirestoreTime = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      //setTimer(`${doc.id} => ${JSON.stringify(doc.data()["20220810"])}`);
      //setTimer(doc.data()['20220812']);
      setTimer(doc.data()[nowFormat]);
      //console.log(`${doc.id} => ${doc.data()}`);
    });
  }
  useEffect(() => {
    getFirestoreTime();
  }, []);

  //useInterval이 좋다?
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

  const testFunction = async () => {
    await setDoc(doc(db, "users", "abc@naver.com"), {
      20220812 : 2000,
      20220801 : 1000
    });
  }

  return (
    <Container>
      <Text>{formatTime()}</Text>
      <Button title="test" onPress={testFunction}></Button>
      {/*<Button title="Start/Stop" onPress={handleStart}></Button>
      <Button title="Stop" onPress={handleReset}></Button>*/}
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