import React from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

const CalendarView = () => {
  return (
    <Calendar
      style={styles.calendar}
      theme={{
        //selectedDayBackgroundColor: 'red',
        arrowColor: 'blue',
        dotColor: 'green',
        //todayTextColor: 'yellow',
        todayBackgroundColor: 'red',
      }}
    />
  );
};

export default CalendarView;