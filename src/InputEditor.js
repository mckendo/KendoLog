import React, {useEffect} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function InputEditor({show, date, data, onComplete}) {
  const [location, onChangeLocation] = React.useState('');
  const [tag, onChangeTag] = React.useState('');
  const [memo, onChangeMemo] = React.useState('');

  useEffect(() => {
    console.log('InputEditor ', data);
    if (data) {
      onChangeLocation(data.location);
      onChangeTag(data.tag);
      onChangeMemo(data.memo);
    } else {
      clear();
    }
  }, [data]);

  const clear = () => {
    onChangeLocation('');
    onChangeTag('');
    onChangeMemo('');
  };

  const onSave = () => {
    if (location === '' && tag === '' && memo === '') {
      return;
    }

    onComplete({
      location,
      tag,
      memo,
      date,
      key: data?.key,
    });

    clear();
  };

  const onCancel = () => {
    clear();

    onComplete(null);
  };

  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            onComplete(null);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{date}</Text>
              <View style={styles.inputLine}>
                <Text style={styles.modalText}>장소</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeLocation}
                  value={location}
                />
              </View>
              <View style={styles.inputLine}>
                <Text style={styles.modalText}>태그</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeTag}
                  value={tag}
                />
              </View>
              <View style={styles.inputLine}>
                <Text style={styles.modalText}>메모</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeMemo}
                  value={memo}
                />
              </View>
              <View style={styles.row}>
                <Pressable
                  style={({pressed}) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                    },
                    styles.buttonInModal,
                    styles.buttonClose,
                  ]}
                  onPress={onCancel}>
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
                  onPress={onSave}>
                  <Text style={styles.textStyle}>저장</Text>
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
    borderColor: '#888888',
    height: 40,
    margin: 10,
    borderWidth: 1,
    minWidth: '100%',
    color: '#cccccc',
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
    minWidth: '50%',
    height: 50,
    justifyContent: 'center',
  },
});

export default InputEditor;
