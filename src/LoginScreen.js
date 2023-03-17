import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function LoginScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Kendo Log</Text>
      <GoogleSigninButton onPress={props.onGoogleButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 70,
    color: '#cccccc',
    margin: 30,
  },
});
