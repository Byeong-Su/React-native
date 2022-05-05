import React, { useState } from 'react';
import { StatusBar, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Navigation from './navigations';
import { images } from './utils/images';
//import { ProgressProvider, UserProvider } from './contexts';

//이미지를 미리 불러와 사용할 수 있도록 아래 함수
//미리 불러와 사용하면 느려지는 문제 개선
const cacheImages = images => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };
  const cacheFonts = fonts => {
    return fonts.map(font => Font.loadAsync(font));
  };
//폰트를 미리 불러와 사용할 수 있도록 아래 함수

const App = () => {
    const [isReady, setIsReady] = useState(false);
  
    const _loadAssets = async () => {
        const imageAssets = cacheImages([
            require('../assets/splash.png'),
            ...Object.values(images),
        ]);
      const fontAssets = cacheFonts([]);
  
      await Promise.all([...imageAssets, ...fontAssets]);
    };

    return isReady ? (
        <ThemeProvider theme={theme}>
            <StatusBar barStyle="dark-content" />
            <Navigation />
        </ThemeProvider>
    ) : (
        <AppLoading
          startAsync={_loadAssets}
          onFinish={() => setIsReady(true)}
          onError={console.warn}
        />
    );
};

export default App;