import React, { useState } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../theme';
import { Button, Input } from '../components';
import Task from '../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const BottomContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: end;
  padding-right: 20;
  padding-left: 90%;
  padding-bottom: 20;
`;
const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 20px;
`;
const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
`;
const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const Todo = ({ navigation }) => {
  const width = Dimensions.get('window').width;

  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({});
  const [show, setShow] = useState(false);

  const _saveTasks = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };
  const _loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'));
  };

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    _saveTasks({ ...tasks, ...newTaskObject });
    setShow(false);
  };
  const _playTask = params => {
    navigation.navigate('Timer', params);
  };
  const _deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTasks(currentTasks);
  };
  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    _saveTasks(currentTasks);
  };
  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTasks(currentTasks);
  };

  const _handleTextChange = text => {
    setNewTask(text);
  };
  const _onBlur = () => {
    setNewTask('');
  };

  const _showAddTask = () => {
    setShow(true);
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.background} // Android only
      />
      <Title>TODO List</Title>
      { show && <Input
        placeholder="+ Add a Task"
        value={newTask}
        onChangeText={_handleTextChange}
        onSubmitEditing={_addTask}
        onBlur={_onBlur}
      />}
      <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                playTask={_playTask}
                //playTask={() => navigation.navigate('Timer')}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
      </List>
      <BottomContainer>
        <Button
          title="+"
          onPress={_showAddTask}
          containerStyle={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: theme.buttonGreen            
          }}
        />
      </BottomContainer>
    </Container>
  );
};

export default Todo;