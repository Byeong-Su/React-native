import React, { useState } from 'react';
import styled from 'styled-components/native';
import Button from '../components/Button';

const StyledText = styled.Text`
  font-size: 24px;
  margin: 10px;
`;

const Timer = () => {
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

export default Timer;