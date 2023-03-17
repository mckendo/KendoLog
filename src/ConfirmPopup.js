import React from 'react';
import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';

function ConfirmPopup({show, message, onResult}) {
  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={show}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{message}</Text>

              <View style={styles.row}>
                <Pressable
                  style={({pressed}) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                    },
                    styles.buttonInModal,
                    styles.buttonClose,
                  ]}
                  onPress={() => onResult(false)}>
                  <Text style={styles.textStyle}>취소</Text>
                </Pressable>
                <Pressable
                  style={({pressed}) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                    },
                    styles.buttonInModal,
                    styles.buttonClose,
                  ]}
                  onPress={() => onResult(true)}>
                  <Text style={styles.textStyle}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    minWidth: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 50,
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  modalText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginTop: 30,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: 'coral',
  },
  buttonInModal: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '45%',
    height: 50,
    justifyContent: 'center',
  },
});

export default ConfirmPopup;
