import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {atom} from 'recoil';

export const logDataAtom = atom({
  key: 'logData',
  default: [],
});

const user = auth().currentUser;
const db = firestore().collection(user ? user.email : 'unknown');

export const getLogs = async () => {
  let logs = [];
  try {
    const data = await db.get();
    logs = data._docs.map(doc => ({...doc.data(), key: doc.id}));
  } catch (error) {
    console.log(error.message);
  }
  return logs;
};

export const addLog = data => {
  let tempData = {...data};
  if (data.key) {
    delete tempData.key;
    db.doc(data.key).update(tempData);
  } else {
    delete tempData.key;
    db.add(tempData);
  }
};

export const deleteLog = id => {
  db.doc(id).delete();
};
