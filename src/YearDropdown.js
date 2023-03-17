import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet} from 'react-native';

const YearDropdown = ({data, onSelect, selectedYear}) => {
  const years = [
    ...new Set(data.map(item => new Date(item.date).getFullYear().toString())),
  ];

  const handleYearSelect = year => {
    console.log('select', year);
    onSelect(year);
  };

  console.log(years);
  console.log('selectedYear', selectedYear);

  return (
    <Picker
      style={styles.container}
      dropdownIconColor="white"
      mode="dropdown"
      selectedValue={selectedYear}
      onValueChange={(itemValue, itemIndex) => handleYearSelect(itemValue)}>
      {years.map(year => (
        <Picker.Item key={year} label={year} value={year} style={styles.item} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  container: {
    color: '#cccccc',
    backgroundColor: '#333333',
  },
  item: {
    color: '#cccccc',
    backgroundColor: '#333333',
  },
});

export default YearDropdown;
