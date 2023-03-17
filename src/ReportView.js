import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useRecoilValue} from 'recoil';

import {logDataAtom} from './api';
import YearDropdown from './YearDropdown';
import YearStatsCard from './YearStatsCard';

const ReportView = () => {
  const [selectedYear, setSelectedYear] = useState();
  const [yearStats, setYearStats] = useState({});
  const [monthStats, setMonthStats] = useState({});

  const logList = useRecoilValue(logDataAtom);

  useEffect(() => {
    const years = [
      ...new Set(
        logList.map(item => new Date(item.date).getFullYear().toString()),
      ),
    ];
    const max = Math.max(...years);
    setSelectedYear(`${max}`);
  }, [logList]);

  const updateYearStats = (data, year) => {
    const yearData = data.filter(
      item => new Date(item.date).getFullYear().toString() === year,
    );
    const locationStats = {};
    const tagStats = {};

    yearData.forEach(item => {
      const {location, tag} = item;
      if (location) {
        locationStats[location] = (locationStats[location] || 0) + 1;
      }
      if (tag) {
        tagStats[tag] = (tagStats[tag] || 0) + 1;
      }
    });

    setYearStats({
      total: yearData.length,
      locations: locationStats,
      tags: tagStats,
    });
  };

  const updateMonthStats = (data, year) => {
    const stats = {};

    // 월별 데이터수, 장소별 데이터수, 태그별 데이터수 구하기
    data.forEach(item => {
      if (year !== new Date(item.date).getFullYear().toString()) {
        return;
      }

      const month = new Date(item.date).getMonth() + 1;
      if (!stats[month]) {
        stats[month] = {
          total: 0,
          locations: {},
          tags: {},
        };
      }
      stats[month].total++;

      if (item.location) {
        stats[month].locations[item.location] =
          (stats[month].locations[item.location] || 0) + 1;
      }
      if (item.tag) {
        stats[month].tags[item.tag] = (stats[month].tags[item.tag] || 0) + 1;
      }
    });

    setMonthStats(stats);
  };

  useEffect(() => {
    if (selectedYear) {
      updateYearStats(logList, selectedYear);
      updateMonthStats(logList, selectedYear);
    }
  }, [selectedYear, logList]);

  console.log('yearStats', yearStats);
  console.log('monthStats', monthStats);

  if (logList?.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{'No data'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <YearDropdown
          data={logList}
          onSelect={setSelectedYear}
          selectedYear={selectedYear}
        />
        {selectedYear && (
          <YearStatsCard stats={yearStats} monthStats={monthStats} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingBottom: 50,
    height: '100%',
  },
  empty: {
    backgroundColor: 'black',
    height: '100%',
    color: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#cccccc',
    fontSize: 18,
  },
});

export default ReportView;
