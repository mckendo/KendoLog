import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import ConfirmPopup from './ConfirmPopup';

export default function SettingsView(props) {
  const user = auth().currentUser;

  const [showPopup, setShowPopup] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.textStyle}>{`Login account: ${user.email}`}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.textStyle}>{'version: 0.1'}</Text>
      </View>
      <Pressable
        style={({pressed}) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
          styles.button,
          styles.buttonClose,
        ]}
        onPress={() => {
          setShowPopup(true);
        }}>
        <Text style={styles.textStyle}>로그아웃</Text>
      </Pressable>
      <ConfirmPopup
        message="진짜 로그아웃?"
        show={showPopup}
        onResult={async res => {
          setShowPopup(false);
          if (res) {
            auth().signOut();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    padding: 10,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cccccc',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    margin: 3,
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: '#aa0000',
  },
  buttonClose: {
    backgroundColor: '#222222',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
