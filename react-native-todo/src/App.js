import React, { useState } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: flex-start;
`;
const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({ theme }) => theme.main};
    align-self: flex-start;
    margin: 0px 20px;
`;
const List = styled.ScrollView`
    flex: 1;
    width: ${({ width }) => width - 40}px;
`;

export default function App() {
    const width = Dimensions.get('window').width;

    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({
        '1': { id: '1', text: 'Hanbit', completed: false },
        '2': { id: '2', text: 'React Native', completed: true },
        '3': { id: '3', text: 'React Native Sample', completed: false },
        '4': { id: '4', text: 'Edit TODO Item', completed: false },
    })

    //추가기능
    const _addTask = () => {
        //id는 타임스탬프 이용
        const ID = Date.now().toString();
        //input 컴포넌트에 입력된 값을 text로
        const newTaskObject = {
            [ID]: { id: ID, text: newTask, completed: false},
        };
        //NewTask의 값을 빈 문자열로
        setNewTask('');
        setTasks({ ...tasks, ... newTaskObject });
    };
    //삭제기능(항목의 id 이용해 삭제)
    const _deleteTask = id => {
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    };
    //완료여부 표시(전환)
    const _toggleTask = id => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        setTasks(currentTasks);
    };
    //수정기능
    const _updateTask = item => {
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item;
        setTasks(currentTasks);
    };

    const _handleTextChange = text => {
        setNewTask(text);
    };
    //입력중 포커스 잃으면 초기화
    const _onBlur = () => {
        setNewTask('');
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={theme.background}
                />
                <Title>TODO List</Title>
                <Input 
                  placeholder="+ Add a Task"
                  value={newTask}
                  onChangeText={_handleTextChange}
                  onSubmitEditing={_addTask}
                />
                <List width={width}>
                    {Object.values(tasks)
                        //최신항목이 가장 앞에 보이도록 역순으로 렌더링
                        .reverse()
                        .map(item => (
                            //key값으로 아이템 식별 고유값 지정
                            <Task
                                key={item.id}
                                item={item}
                                deleteTask={_deleteTask}
                                toggleTask={_toggleTask}
                                updateTask={_updateTask}
                                onBlur={_onBlur}
                            />
                        ))}
                </List>
            </Container>
        </ThemeProvider>
    );
}