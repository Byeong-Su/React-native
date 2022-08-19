import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components';
import { BackHandler, Alert } from "react-native";
import styled from 'styled-components/native';
import { getCurrentUser, app } from '../utils/firebase';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

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

const Timer = ({ navigation }) => {
  const [timer, setTimer] = useState();
  const [isActive, setIsActive] = useState(false);
  const increment = useRef(null);

  //오늘 날짜 설정
  const now = new Date();
  const nowMonth = (now.getMonth()+1) < 10 ? '0'+(now.getMonth()+1).toString() : (now.getMonth()+1).toString();
  const nowDay = (now.getDate) < 10 ? '0'+(now.getDate()).toString() : (now.getDate()).toString();
  const nowFormat = now.getFullYear().toString() + '-' + nowMonth + '-' + nowDay;

  //현재 접속한 유저 정보
  const user = getCurrentUser();
  const userEmail = user.email;

  const db = getFirestore(app);

  //마운트시 데이터베이스에서 오늘자 공부시간 불러오기
  const getFirestoreTime = async () => {
    const userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);
    if(userSnap.data()[nowFormat] === undefined){
      setTimer(0);
    } else {
      setTimer(userSnap.data()[nowFormat]);
    }
  }

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

  //타이머 초기화용
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

  //공부한 시간 저장 및 뒤로가기
  const saveTime = async () => {
    await setDoc(doc(db, "users", userEmail), {
      [nowFormat] : timer
    }, { merge : true });
    navigation.goBack();
  };

  useEffect(() => {
    handleStart();
    getFirestoreTime();

    return () => {
      handleStart();
    }
  }, []);

  return (
    <Container>
      <Text>{formatTime()}</Text>
      <Button title="종료" onPress={() => saveTime()}></Button>
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