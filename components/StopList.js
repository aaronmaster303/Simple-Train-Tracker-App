import { StyleSheet } from 'react-native';
import { ScrollView, View } from 'react-native';
import Stop from './Stop';

// const statusStrings = {
//   STOPPED_AT: '⬣',
//   IN_TRANSIT_TO: '← (In transit to)',
//   INCOMING_AT: '←',
// };

const StopList = ({ stopList, vehicleLocations, lineColor }) => {
  const map = new Map();

  if (stopList.length) {
    stopList.forEach((item) => map.set(item.name, { name: item.name }));
  }

  vehicleLocations?.forEach((item) => {
    if (map.has(item.name)) {
      map.set(item.name, { ...map.get(item.name), status: item.status });
    } else {
      map.set(item.name, { name: item.name, status: item.status });
    }
  });

  const finalStopList = Array.from(map.values());

  return (
    <View style={styles.viewContainer}>
      <ScrollView style={styles.scrollViewContainer} horizontal={false}>
        {finalStopList.map((stop) => (
          <Stop name={stop.name} status={stop.status} lineColor={lineColor} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    overflow: 'hidden',
    borderTopColor: 'black',
    borderTopWidth: '1px',
    borderBottomColor: 'black',
    borderBottomWidth: '1px',
  },
  scrollViewContainer: {
    flex: 1,
  },
});

export default StopList;
