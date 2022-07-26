import React, { useState, useRef, useEffect, useContext } from 'react';
import { ProgressContext, UserContext } from '../contexts';
import styled from 'styled-components/native';
import { Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { signin } from '../utils/firebase';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;
const ErrorText = styled.Text`
align-items: flex-start;
width: 100%;
height: 20px;
margin-bottom: 10px;
line-height: 20px;
color: ${({ theme }) => theme.errorText};
`;

const Login = ({ navigation }) => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const _handleEmailChange = email => {
    //공백제거(이메일은 공백이 없으므로)
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      //유효성 검사
      validateEmail(changedEmail) ? '' : 'Please verify your email.'
    );
  };
  const _handlePasswordChange = password => {
    setPassword(removeWhitespace(password));
  };
  const _handleLoginButtonPress = async () => {
    try {
      //login 함수를 호출하기 전에 Spinner 컴포넌트 렌더링
      spinner.start();
      const user = await signin({ email, password });
      //로그인 성공하면 UserContext의 dispatch 함수를 이용해 user 상태가 인증된 사용자의 정보로 변경
      dispatch(user);
    } catch (e) {
      Alert.alert('Login Error', e.message);
    } finally {
      //성공여부 관계없이 작업 완료되면 렌더링 되지않게 상태 변경
      spinner.stop();
    }
  };
  
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
    <Container insets={insets}>
      <Input
          label="Email"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
      />
      <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
      />
      <ErrorText>{errorMessage}</ErrorText>
      <Button
        title="Login"
        onPress={_handleLoginButtonPress}
        //값에따라 버튼 활성화 여부 결정
        disabled={disabled}
      />
      <Button
        title="Sign up with email"
        onPress={() => navigation.navigate('Signup')}
        isFilled={false}
      />
    </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;