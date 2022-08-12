import React, {useState} from 'react';
import styled from 'styled-components/native';
import { Calendar } from "react-native-calendars";
import { StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";

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
  const [myText, setmyText] = useState("");
  //State를 이용하여 Modal을 제어함
  const [modalVisible, setModalVisible] = useState(false);
  //Output을 State로 받아서 화면에 표출하거나 정보 값으로 활용
  const [modalOutput, setModalOutput] = useState();

  return (
    <Container>
      <Calendar
        //사용자의 시간 데이터를 받아서
        //시간에 따라 마킹 진하기 다르게
        markingType={'period'}
        markedDates={{
          '2022-07-15': {marked: true, dotColor: '#50cebb'},
          '2022-07-16': {marked: true, dotColor: '#50cebb'},
          '2022-07-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
          '2022-07-22': {color: '#70d7c7', textColor: 'white'},
          '2022-07-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
          '2022-07-24': {color: '#70d7c7', textColor: 'white'},
          '2022-07-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
        }}

        style={styles.calendar}
        theme={{
          //selectedDayBackgroundColor: 'red',
          arrowColor: 'blue',
          dotColor: 'green',
          //todayTextColor: 'yellow',
          todayBackgroundColor: 'red',
        }}

        onDayPress={day => {
          console.log('selected day', day);
          //JSON to String
          //setModalOutput(JSON.stringify(day));
          //JSON to Key and Value          
          //setModalOutput(day.year);
          //setModalOutput(day.month);
          //setModalOutput(day.day);
          setModalOutput(day.timestamp);
          //setModalOutput(day.dateString);
          setModalVisible(true);
        }}
      />
      { modalVisible && <Text>{modalOutput}</Text> }
      
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
            <StyledModalText>선택 4</StyledModalText>
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