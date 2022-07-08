import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
//import styled from 'styled-components/native';

const circleButton = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#3498db',
        padding: 16,
        margin: 10,
        borderRadius: 50,
      }}>
      <Text>+</Text>
    </TouchableOpacity>
  );
};

/*
circleButton.defaultProps = {
  isFilled: true,
};

circleButton.propTypes = {
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  isFilled: PropTypes.bool,
  disabled: PropTypes.bool,
};*/

export default circleButton;