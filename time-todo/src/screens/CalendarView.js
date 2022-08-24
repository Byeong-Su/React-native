import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Calendar } from "react-native-calendars";
import { StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import { getCurrentUser, app } from '../utils/firebase';
import { getFirestore, doc, setDoc, getDoc, waitForPendingWrites } from 'firebase/firestore';

const Container = styled.View`
  flex: 1;
`;
const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

const StyledModalContainer = styled.View`
  flex-direction: column;
  align-items: center;
  /* 모달창 크기 조절 */
  width: 320px;
  height: 220px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
`;

const StyledModalButton = styled.TouchableOpacity`
  /* Modal Button들의 모달창 내의 높이를 균일하게 하기 위하여 flex를 줌 */
  flex: 1;
  width: 320px;
  justify-content: center;
`;

// 모달창 내에서 버튼으로 활용되지 않는 타이틀 부분은 View 만듬
const StyledModalGradeWrapper = styled.View`
  flex: 1;
  width: 320px;
  justify-content: center;
`;

const StyledModalGradeText = styled.Text`
  align-self: center;
  font-size: 15px;
`;

const StyledModalText = styled.Text`
  align-self: center;
  color: blue;
  font-size: 15px;
`;

//React Native 요소 중에서 CSS에서 hr 태그 같은 요소를 몰라서 View로 구현... 더 좋은 방법이 있다면 알려주세요
const HorizentalLine = styled.View`
  background-color: black;
  height: 1px;
  align-self: stretch;
`;

const StyledModalOpenButton = styled.TouchableOpacity`
  height: 50px;
  width: 60%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 1);
`;

const StyledModalOutputText = styled.Text`
  color: black;
  font-size: 30px;
`;

const CalendarView = () => {
  //State를 이용하여 Modal을 제어함
  const [modalVisible, setModalVisible] = useState(false);
  //Output을 State로 받아서 화면에 표출하거나 정보 값으로 활용
  const [modalOutput, setModalOutput] = useState();
  const [clickDayTime, setClickDayTime] = useState();

  const [t,setT] = useState();

  //현재 접속한 유저 정보
  const user = getCurrentUser();
  const userEmail = user.email;

  const db = getFirestore(app);

  //마운트시 데이터베이스에서 오늘자 공부시간 불러오기
  const getFirestoreTime = async () => {
    const userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);
    //setT(JSON.stringify(userSnap.data()));
    //setT(Object.getOwnPropertyNames(userSnap.data()));

    var dateKeys = [];
    var timeVlaues = [];
    Object.getOwnPropertyNames(userSnap.data()).forEach(
      function (val, idx, array) {
        dateKeys[idx] = val;
        timeVlaues[idx] = userSnap.data()[val];
      }
    ); 
    // var jsonData = [
    //   { "id": 1, "name": "Hotels" },
    //   { "id": 2, "name": "Embassies" }
    // ];
    // var data = jsonData.map(function(item) {
    //   return {
    //     key: item.id,
    //     label: item.name
    //   };
    // });
    
    //setT(JSON.stringify(data));

    // if(userSnap.data()['2022-08-18'] === undefined){
    //   setT(0);
    // } else {
    //   setT(userSnap.data()['2022-08-18']);
    // }
  };

  const getDayTime = async (dateFormat) => {
    const userRef = doc(db, "users", userEmail);
    const userSnap = await getDoc(userRef);
    //undifined 블로그 기록
    if(userSnap.data()[dateFormat] === undefined){
      setClickDayTime(0);
    } else {
      setClickDayTime(userSnap.data()[dateFormat]);
    }
  };

  useEffect(() => {
    getFirestoreTime();
  }, []);

  const dada = '2022-08-02';
  const [markedDates, setMarkedDates] = useState({
    '2022-08-20': {textColor: 'green'},
    '2022-08-22': {startingDay: true, color: 'green'},
    '2022-08-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
    '2022-08-04': {disabled: true, startingDay: true, color: 'green', endingDay: true},
    dada: {disabled: true, startingDay: true, color: 'green', endingDay: true}
  })
  //test해볼것
  //https://maaani.tistory.com/158

  return (
    <Container>
      <Calendar
        //사용자의 시간 데이터를 받아서
        //시간에 따라 마킹 진하기 다르게
        markingType={'period'}
        markedDates={markedDates}
        /*markedDates={{
          '2022-07-15': {marked: true, dotColor: '#50cebb'},
          '2022-07-16': {marked: true, dotColor: '#50cebb'},
          '2022-07-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
          '2022-07-22': {color: '#70d7c7', textColor: 'white'},
          '2022-07-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
          '2022-07-24': {color: '#70d7c7', textColor: 'white'},
          '2022-07-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
        }}*/

        style={styles.calendar}
        theme={{
          //selectedDayBackgroundColor: 'red',
          arrowColor: 'blue',
          dotColor: 'green',
          //todayTextColor: 'yellow',
          todayBackgroundColor: 'red',
        }}

        onDayPress={day => {
          //JSON to String
          //setModalOutput(JSON.stringify(day));
          //JSON to Key and Value          
          //setModalOutput(day.year);
          //setModalOutput(day.month);
          //setModalOutput(day.day);
          //setModalOutput(day.timestamp);
          //오늘 날짜 설정
          const nowMonth = (day.month) < 10 ? '0'+(day.month.toString()) : (day.month.toString());
          const nowDay = (day.day) < 10 ? '0'+(day.day.toString()) : (day.day.toString());
          getDayTime(day.year.toString() + '-' + nowMonth + '-' + nowDay);
          
          setModalOutput(day.dateString);
          setModalVisible(true);
          
          
        }}
      />
      { modalVisible && <Text>{modalOutput}</Text> }
      
      <Text>{t}</Text>

      <Modal
        //isVisible Props에 State 값을 물려주어 On/off control
        isVisible={modalVisible}
        //아이폰에서 모달창 동작시 깜박임이 있었는데, useNativeDriver Props를 True로 주니 해결되었다.
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <StyledModalContainer>
          <StyledModalGradeWrapper>
            <StyledModalGradeText>선택지</StyledModalGradeText>
          </StyledModalGradeWrapper>

          <HorizentalLine />

          <StyledModalButton
            onPress={() => {
              setModalOutput("선택 1");
              setModalVisible(false);
            }}
          >
            <StyledModalText>선택 1</StyledModalText>
          </StyledModalButton>

          <HorizentalLine />

          <StyledModalButton
            onPress={() => {
              setModalOutput("선택 2");
              setModalVisible(false);
            }}
          >
            <StyledModalText>선택 2</StyledModalText>
          </StyledModalButton>

          <HorizentalLine />

          <StyledModalButton
            onPress={() => {
              setModalOutput("선택 3");
              setModalVisible(false);
            }}
          >
            <StyledModalText>선택 3</StyledModalText>
          </StyledModalButton>

          <HorizentalLine />

          <StyledModalButton
            onPress={() => {
              setModalOutput("선택 4");
              setModalVisible(false);
            }}
          >
            <StyledModalText>{clickDayTime}</StyledModalText>
          </StyledModalButton>

          <HorizentalLine />

          <StyledModalButton
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text style={{ alignSelf: "center" }}>취소</Text>
          </StyledModalButton>
          </StyledModalContainer>
      </Modal>
    </Container>
  );
};

export default CalendarView;

//캘린더 관련 문서
//https://github.com/wix/react-native-calendars

//모달 관련 문서
//https://github.com/react-native-modal/react-native-modal