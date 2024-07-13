import { StyleSheet } from 'react-native';
import { ScrollView, View, Text } from 'react-native';

const StopList = ({ stationList }) => {
  return (
    <ScrollView style={styles.scrollContainer}>
      {stationList.map((station, index) => (
        <View key={index} style={styles.stationContainer}>
          <Text style={station.status ? styles.stationTextActive : styles.stationText}>
            {station.name}
          </Text>
          {station.status && <Text style={styles.stationStatus}>{`(${station.status})`}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    borderTopColor: 'black',
    borderTopWidth: '1px',
    borderBottomColor: 'black',
    borderBottomWidth: '1px',
  },
  stationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  stationText: {
    fontSize: 18,
  },
  stationTextActive: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  stationStatus: {
    fontSize: 16,
    color: '#28a745',
  },
});

export default StopList;
