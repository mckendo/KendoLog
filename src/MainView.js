import {format} from 'date-fns';
import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {FAB} from 'react-native-paper';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useRecoilState} from 'recoil';

import {addLog, deleteLog, getLogs, logDataAtom} from './api';
import ConfirmPopup from './ConfirmPopup';
import InputEditor from './InputEditor';

function MainView() {
  const [logList, setLogList] = useRecoilState(logDataAtom);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const [inputData, setInputData] = useState({
    show: false,
    date: '',
    data: undefined,
  });

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  useQuery(['getLogs'], getLogs, {
    refetchOnWindowFocus: true,
    retry: 0,
    onSuccess: data => {
      console.log('useQuery.onSuccess', data);
      setLogList(data);
    },
    onError: e => {
      console.log('useQuery.onError', e.message);
    },
  });

  const queryClient = useQueryClient();

  const updateMutation = useMutation(addLog, {
    onMutate: variable => {
      console.log('updateMutation.onMutate', variable);
    },
    onError: (error, variable, context) => {
      console.log('updateMutation.onError', error);
    },
    onSuccess: (data, variables, context) => {
      console.log('updateMutation.onSuccess');
      queryClient.invalidateQueries(['getLogs']);
    },
    onSettled: () => {
      console.log('updateMutation.onSettled');
    },
  });

  const deleteMutation = useMutation(deleteLog, {
    onMutate: variable => {
      console.log('deleteMutation.onMutate', variable);
    },
    onError: (error, variable, context) => {
      console.log('deleteMutation.onError', error);
    },
    onSuccess: (data, variables, context) => {
      console.log('deleteMutation.onSuccess');
      queryClient.invalidateQueries(['getLogs']);
    },
    onSettled: () => {
      console.log('deleteMutation.onSettled');
    },
  });

  const onComplete = data => {
    console.log(data);
    setInputData({
      show: false,
    });
    if (data) {
      setTimeout(() => updateMutation.mutate(data), 0);
    }
  };

  const markedDates = logList.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true};
    return acc;
  }, {});

  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };

  const listData = logList.filter(item => item.date === selectedDate);

  const renderItem = ({item}) => (
    <View style={styles.listItem}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemContentText}>{`날짜: ${item.date}`}</Text>
        <Text
          style={styles.listItemContentText}>{`장소: ${item.location}`}</Text>
        <Text style={styles.listItemContentText}>{`태그: ${item.tag}`}</Text>
        <Text style={styles.listItemContentText}>{`메모: ${item.memo}`}</Text>
      </View>
      <View style={styles.listItemButtons}>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
            styles.button,
            styles.buttonEdit,
          ]}
          onPress={() => {
            setInputData({
              show: true,
              date: selectedDate,
              data: item,
            });
          }}>
          <Text style={styles.textStyle}>수정</Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
            styles.button,
            styles.buttonDelete,
          ]}
          onPress={() => {
            setShowDeletePopup(true);
            setDeleteId(item.key);
          }}>
          <Text style={styles.textStyle}>삭제</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text
          style={
            styles.textStyle
          }>{`${user?.displayName}(${user?.email})`}</Text>
      </View> */}

      <View style={styles.calendarView}>
        <Calendar
          style={styles.calendar}
          markedDates={markedSelectedDates}
          theme={{
            backgroundColor: '#000000',
            calendarBackground: '#000000',
            textSectionTitleColor: '#00adf5',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#ffffff',
            textDisabledColor: '#555555',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#cccccc',
            disabledArrowColor: '#555555',
            monthTextColor: '#eeeeee',
          }}
          onDayPress={day => {
            setSelectedDate(day.dateString);
          }}
        />
      </View>

      <InputEditor
        show={inputData.show}
        date={inputData.date}
        data={inputData.data}
        onComplete={onComplete}
      />
      <View style={styles.flatListView}>
        <FlatList data={listData} renderItem={renderItem} />
      </View>
      <ConfirmPopup
        message="진짜 삭제합니까?"
        show={showDeletePopup}
        onResult={res => {
          setShowDeletePopup(false);
          if (res) {
            setTimeout(() => deleteMutation.mutate(deleteId), 0);
          }
        }}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() =>
          setInputData({
            show: true,
            date: selectedDate,
            data: undefined,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#999999',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {
    flex: 1,
    marginVertical: 1,
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
  },
  listItemContent: {
    flex: 1,
  },
  listItemButtons: {
    flexDirection: 'row',
    paddingTop: 15,
    justifyContent: 'space-between',
  },
  listItemContentText: {
    fontSize: 15,
    color: '#cccccc',
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#cccccc',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    height: 40,
    margin: 3,
    alignContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonDelete: {
    backgroundColor: '#990000',
  },
  buttonEdit: {
    backgroundColor: '#333333',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  calendarView: {
    padding: 0,
    marginBottom: 5,
  },
  flatListView: {
    flex: 1,
    marginBottom: 50,
  },
});

export default MainView;
