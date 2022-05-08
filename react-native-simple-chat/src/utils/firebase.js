import * as firebase from 'firebase';
import config from '../../firebase.json';

const app = firebase.initializeApp(config);

const Auth = app.auth();

export const login = async ({ email, password }) => {
    //signWithEamilAndPassword 이메일, 비밀번호 이용해 인증하는 함수
    const { user } = await Auth.signWithEamilAndPassword(email, password);
    return user;
};