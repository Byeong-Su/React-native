import React, { useState } from 'react';
import styled from 'styled-components/native';
import Button from './Button';

const StyledText = styled.Text`
    font-size: 25px;
    margin: 10px;
`;

const Counter = () => {
    //useState 변수(count)와 변수를 수정할수있는 세터함수(setCount)배열 반환
    const [count, setCount] = useState(0);

    return (
        <>
        <StyledText>count: {count}</StyledText>
        <Button
            title="+"
            onPress={() => {
                setCount(prevCount => prevCount + 1);
                setCount(prevCount => prevCount + 1);
            }}
        />
        <Button
            title="-"
            onPress={() => {
                setCount(count - 1);
            }}
        />
        </>
    );
};

export default Counter;