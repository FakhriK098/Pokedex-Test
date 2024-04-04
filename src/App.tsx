import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {RecoilRoot} from 'recoil';
import {RootNavigator} from './navigation/stack/RootStack';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
