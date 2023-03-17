import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const YearStatsCard = ({stats, monthStats}) => {
  if (stats.total) {
    return (
      <View>
        <View style={styles.card}>
          <Text style={styles.titleText}>{`연간: ${stats.total}`}</Text>
          {Object.entries(stats.locations).length > 0 && (
            <Text style={styles.subTitleText}>장소:</Text>
          )}
          {Object.entries(stats.locations).map(([location, count]) => (
            <Text style={styles.contentText} key={location}>
              {location}: {count}
            </Text>
          ))}
          {Object.entries(stats.tags).length > 0 && (
            <Text style={styles.subTitleText}>태그:</Text>
          )}
          {Object.entries(stats.tags).map(([tag, count]) => (
            <Text style={styles.contentText} key={tag}>
              {tag}: {count}
            </Text>
          ))}
        </View>
        {/** Month */}
        {Object.keys(monthStats).map(index => (
          <View style={styles.card} key={index}>
            <Text
              style={
                styles.titleText
              }>{`${index}월: ${monthStats[index].total}`}</Text>
            {Object.entries(monthStats[index].locations).length > 0 && (
              <Text style={styles.subTitleText}>장소:</Text>
            )}
            {Object.entries(monthStats[index].locations).map(
              ([location, count]) => (
                <Text style={styles.contentText} key={location}>
                  {location}: {count}
                </Text>
              ),
            )}
            {Object.entries(monthStats[index].tags).length > 0 && (
              <Text style={styles.subTitleText}>태그:</Text>
            )}
            {Object.entries(monthStats[index].tags).map(([tag, count]) => (
              <Text style={styles.contentText} key={tag}>
                {tag}: {count}
              </Text>
            ))}
          </View>
        ))}
      </View>
    );
  } else {
    return <Text>No Data</Text>;
  }
};

const styles = StyleSheet.create({
  contentText: {
    paddingLeft: 20,
    fontSize: 16,
    color: '#cccccc',
  },
  subTitleText: {
    fontWeight: 500,
    paddingLeft: 10,
    fontSize: 16,
    color: '#cccccc',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 500,
    color: '#cccccc',
  },
  card: {
    borderWidth: 1,
    borderColor: '#555555',
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
  },
});

export default YearStatsCard;
