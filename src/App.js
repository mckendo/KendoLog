import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';

import LoginScreen from './LoginScreen';
import TabView from './TabView';

import {API_KEY} from './secret';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: false,
    },
  },
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: API_KEY,
    });
  }, []);

  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  auth().onAuthStateChanged(user => {
    // console.log('onAuthStateChanged', user);
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  if (loggedIn) {
    return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <TabView />
        </RecoilRoot>
      </QueryClientProvider>
    );
  }

  return <LoginScreen onGoogleButtonPress={onGoogleButtonPress} />;
}

export default App;
