import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Button, Image, Input } from '../components';
import { UserContext, ProgressContext } from '../contexts';
import { Alert } from 'react-native';
import { getCurrentUser, updateUserInfo, signout } from '../utils/firebase';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Profile = () => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const theme = useContext(ThemeContext);

  //현재 접속한 사용자 정보 받아오기
  const user = getCurrentUser();
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

  const _handleLogoutButtonPress = async () => {
    try {
      spinner.start();
      //firebase.js에 작성된 logout 함수가 호출
      await signout();
    } catch (e) {
      console.log('[Profile] logout: ', e.message);
    } finally {
      //logout완료시 UserContext의 dispatch함수를 이용해 user 상태 변경
      dispatch({});
      spinner.stop();
    }
  };

  const _handlePhotoChange = async url => {
    try {
      spinner.start();
      const photoUrl = await updateUserInfo(url);
      setPhotoUrl(photoUrl);
    } catch (e) {
      Alert.alert('Photo Error', e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <Container>
      <Image
        url={photoUrl}
        onChangeImage={_handlePhotoChange}
        showButton
        rounded
      />
      {/*getCurrentUser함수가 반환한 내용으로 사용자의 이름과 이메일을 Input 컴포넌트에 렌더링*/}
      {/*프로필 화면에서는 사용자의 이름이나 이메일 수정기능 제공 않으므로 입력 불가능하게 disabled처리*/}
      <Input label="Name" value={user.name} disabled />
      <Input label="Email" value={user.email} disabled />
      <Button
        title="logout"
        onPress={_handleLogoutButtonPress}
        containerStyle={{ marginTop: 30, backgroundColor: theme.buttonLogout }}
      />
    </Container>
  );
};

export default Profile;