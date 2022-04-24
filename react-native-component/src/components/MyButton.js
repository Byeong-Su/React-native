//3.2.2
//커스텀컴포넌트 만들기

//리액트를 불러와 사용가능하게
import React from 'react';
//TouchableOpacity와 Text 컴포넌트를 추가
import { TouchableOpacity, Text } from 'react-native';
//PropTypes사용(잘못된 props가 전달됬다는걸 알림)
import PropTypes from 'prop-types';

//TouchableOpacity로 클릭에 대해 상호작용하게, Text로 버튼에 내용 표시
const MyButton = props => {
  return (
    <TouchableOpacity
      style={{
          backgroundColor: '#3498db',
          padding: 16,
          margin: 10,
          borderRadius: 8,
      }}
      onPress={() => props.onPress()}
    >
        <Text style={{ color: 'white', fontSize: 24 }}>{props.children || props.title}</Text>
    </TouchableOpacity>      
  );
}

/*
//기본값을 defaultProps로 지정해 빈 값이 나타나는 상황 방지
MyButton.defaultProps = {
    title: 'Button',
};*/



MyButton.propTypes = {
    //props 타입 잘못 전달된 경우 경고메시지 출력
    //title: PropTypes.number,
    //title의 타입을 경고메시지에 따라 string타입으로 맞춰주면 경고 안뜸
    //title: PropTypes.string,
    //필수 여부 지정
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default MyButton;
