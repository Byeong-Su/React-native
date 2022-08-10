import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components';
import { BackHandler, Alert } from "react-native";
//import moment from 'moment';
import styled from 'styled-components/native';
import { app } from '../utils/firebase';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
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






//moment라이브러리 이용해 createdAt필드에 저장된 타임스탭프를 보기좋은 형식으로 변경
/*const getDateOrTime = ts => {
  const now = moment().startOf('day');
  const target = moment(ts).startOf('day');
  return moment(ts).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
};*/

const Timer = () => {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const increment = useRef(null)

  const [tmpTimer, setTmpTimer] = useState('empty');

  const db = getFirestore(app);

  const collectionQuery = query(collection(db, 'users'));  

  const testFunction = () => {
    onSnapshot(collectionQuery, snapshot => {
      const list = [];
      snapshot.forEach(doc => {
        list.push(doc.data());
      });
      tmpTimer=list[0];
      setTmpTimer(list);
    });
  };

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
      <Text>{tmpTimer}</Text>
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