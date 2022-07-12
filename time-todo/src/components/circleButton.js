import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.buttonTitle};
  align-items: center;
  border-radius: 40px;
  width: 100px;
  padding-left: 100px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
const Title = styled.Text`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: ${({ theme }) => theme.buttonTitle};
`;

const circleButton = ({ containerStyle, title, onPress, isFilled, disabled }) => {
  return (
    <Container
      style={containerStyle}
      onPress={onPress}
      isFilled={isFilled}
      disabled={disabled}
    >
      <Title isFilled={isFilled}>{title}</Title>
    </Container>
  );
};

circleButton.defaultProps = {
  isFilled: true,
};

circleButton.propTypes = {
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  isFilled: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default circleButton;