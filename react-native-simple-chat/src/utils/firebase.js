import * as firebase from 'firebase';
import config from '../../firebase.json';

const app = firebase.initializeApp(config);

const Auth = app.auth();

const uploadImage = async uri => {
    if (uri.startsWith('https')) {
      return uri;
    }
  
    const response = await fetch(uri);
    const blob = await response.blob();
  
    const { uid } = auth.currentUser;
    const storage = getStorage(app);
    const storageRef = ref(storage, `/profile/${uid}/photo.png`);
    await uploadBytes(storageRef, blob, {
      contentType: 'image/png',
    });
  
    return await getDownloadURL(storageRef);
};

export const login = async ({ email, password }) => {
    //signWithEamilAndPassword 이메일, 비밀번호 이용해 인증하는 함수
    const { user } = await Auth.signWithEamilAndPassword(email, password);
    return user;
};