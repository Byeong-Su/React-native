import React, {useState} from 'react';
import styled from 'styled-components/native';
import { Calendar } from "react-native-calendars";
import { StyleSheet, Text } from "react-native";

const Container = styled.View`
  flex: 1;
`;
const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

const CalendarView = () => {
  const [myText, setmyText] = useState("");
  const [modal, setModal] = useState(false);

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
          setmyText(JSON.stringify(day));
          setModal(true);
        }}
      />
      { modal && <Text>{myText}</Text> }
    </Container>
  );
};

export default CalendarView;

//캘린더 관련 문서
//https://github.com/wix/react-native-calendars