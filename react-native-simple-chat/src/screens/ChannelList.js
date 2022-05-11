import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { app } from '../utils/firebase';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;
const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const ItemDescription = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listDescription};
`;
const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime};
`;

//moment라이브러리 이용해 createdAt필드에 저장된 타임스탭프를 보기좋은 형식으로 변경
const getDateOrTime = ts => {
  const now = moment().startOf('day');
  const target = moment(ts).startOf('day');
  return moment(ts).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
};

//React.memo로 컴포넌트의 리렌더링을 방지
const Item = React.memo(
  ({ item: { id, title, description, createdAt }, onPress }) => {
    const theme = useContext(ThemeContext);

    return (
      <ItemContainer onPress={() => onPress({ id, title })}>
        <ItemTextContainer>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </ItemTextContainer>
        <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={theme.listIcon}
        />
      </ItemContainer>
    );
  }
);

const ChannelList = ({ navigation }) => {
  const [channels, setChannels] = useState([]);

  const db = getFirestore(app);
  useEffect(() => {
    const collectionQuery = query(
      collection(db, 'channels'),
      //최근에 만들어진 채널이 가장 위에 나오도록 데이터 조회 조건으로 createdAt 필드값의 내림차순 설정
      orderBy('createdAt', 'desc')
    );
    //onSnapshot함수로 데이터베이스에서 데이터를 수신
    const unsubscribe = onSnapshot(collectionQuery, snapshot => {
      const list = [];
      snapshot.forEach(doc => {
        list.push(doc.data());
      });
      setChannels(list);
    });
    return () => unsubscribe();
  }, []);

  const _handleItemPress = params => {
    navigation.navigate('Channel', params);
  };

  return (
    <Container>
      <FlatList
        //각 항목의 id값을 키로 이용하도록 keyExtractor 설정
        keyExtractor={item => item['id']}
        //임의의 데이터를 FlatList 컴포넌트 항목으로 사용할 데이터로 설정
        data={channels}
        //파라미터로 항목의 데이터를 가진 item이 포함된 객체가 전달
        renderItem={({ item }) => (
          //파라미터로 전달되는 데이터를 이용해 각 항목의 내용 렌더링, 클릭시 채널화면으로 이동하도록 설정
          <Item item={item} onPress={_handleItemPress} />
        )}
        //화면 렌더링 개수 현재랑 앞뒤 1개씩으로 설정
        windowSize={3}
      />
    </Container>
  );
};

export default ChannelList;