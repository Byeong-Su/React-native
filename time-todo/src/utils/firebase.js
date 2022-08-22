import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import config from '../../firebase.json';

export const app = initializeApp(config);

const auth = getAuth(app);

export const signin = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

const uploadImage = async uri => {
  if (uri.startsWith('https')) {
    return uri;
  }

  const response = await fetch(uri);
  const blob = await response.blob();

  const { uid } = auth.currentUser;
  const storage = getStorage(app);
  //사용자 uid를 이용해 사진 저장될 주소를 구분
  const storageRef = ref(storage, `/profile/${uid}/photo.png`);
  await uploadBytes(storageRef, blob, {
    contentType: 'image/png',
  });

  return await getDownloadURL(storageRef);
};

export const signup = async ({ name, email, password, photoUrl }) => {
  //사용자 정보를 전달 받음
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const photoURL = await uploadImage(photoUrl);
  await updateProfile(auth.currentUser, { displayName: name, photoURL });
  return user;
};
//현재 접속한 사용자 정보 받아오는 함수
export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = auth.currentUser;
  return { uid, name: displayName, email, photoUrl: photoURL };
};

export const updateUserInfo = async photo => {
  //스토리지에 사진 업로드
  const photoUrl = await uploadImage(photo);
  await updateProfile(auth.currentUser, { photoUrl });
  return photoUrl;
};

export const signout = async () => {
  await signOut(auth);
  return {};
};


const db = getFirestore(app);

export const createTime = async ({ id, time }) => {
  const timeCollection = collection(db, 'users');
  const newTimeRef = doc(timeCollection);
  //const id = newTimeRef.id;
  const newTime = {
    id,
    time,
    createdAt: Date.now(),
  };
  await setDoc(newTimeRef, newTime);
  return id;
};
//message 컬렉션이 위치한 채널 문서를 찾기위해 channelId를 받음
export const createMessage = async ({ todoId, message }) => {
  const docRef = doc(db, `channels/${todoId}/messages`, message._id);
  await setDoc(docRef, { ...message, createdAt: Date.now() });
};