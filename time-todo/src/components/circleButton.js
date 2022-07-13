import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.buttonLogout};
  align-items: center;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
`;
const Title = styled.Text`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: ${({ theme }) => theme.buttonUnfilledTitle};
`;

const circleButton = ({ containerStyle, title, onPress }) => {
  return (
    <Container
      style={containerStyle}
      onPress={onPress}
    >
      <Title>{title}</Title>
    </Container>
  );
};

Button.propTypes = {
  containerStyle: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

export default circleButton;

/*import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.buttonLogout};
  align-items: center;
  border-radius: 40px;
  width: 100px;
  height: 100px;
  padding-left: 100px;
`;
const Title = styled.Text`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: ${({ theme }) => theme.buttonTitle};
`;

const circleButton = ({ title, onPress }) => {
  return (
    <Container
      onPress={onPress}
    >
      <Title>{title}</Title>
    </Container>
  );
};

circleButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

export default circleButton;*/