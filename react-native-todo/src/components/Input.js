import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.main,
}))`
    width: 100%;
    height: 60px;
    margin: 3px 0;
    padding: 15px 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.itemBackground};
    font-size: 25px;
    color: ${({ theme }) => theme.text};
`;

const Input = ({
    placeholder, 
    value, 
    onChangeText, 
    onSubmitEditing,
    onBlur,
 }) => {
    const width = Dimensions.get('window').width;

    return (
        <StyledInput 
            width={width} 
            placeholder={placeholder}
            //maxLength={50} : 입력가능 글자의 수를 50자로 제한
            maxLength={50}
            //자동 대문자 전환 끄기
            autoCapitalize="none"
            //자동 수정기능 끄기
            autoCorrect={false}
            //키보드 완료 버튼을 설정하는 returnKeyType를 done으로 변경
            returnKeyType="done"
            //키보드 색상 어둡게 변경
            keyboardAppearance="dark"
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
        />
    );    
};

Input.PropTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
};

export default Input;