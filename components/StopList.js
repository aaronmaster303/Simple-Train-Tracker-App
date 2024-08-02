import { StyleSheet } from 'react-native';
import { ScrollView, View, Text } from 'react-native';

// const statusStrings = {
//   STOPPED_AT: '⬣',
//   IN_TRANSIT_TO: '← (In transit to)',
//   INCOMING_AT: '←',
// };

const statusStrings = {
  STOPPED_AT: '(Stopped at)',
  IN_TRANSIT_TO: '(In transit to)',
  INCOMING_AT: '(Incoming at)',
};
const StopList = ({ stopList, vehicleLocations, lineColor }) => {
  const map = new Map();

  stopList.forEach((item) => map.set(item.name, { name: item.name }));

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
        {finalStopList.map((stop, index) =>
          stop.status ? (
            <View
              key={index}
              style={[styles.stopContainer, { backgroundColor: lineColor.lighter }]}>
              <Text style={[styles.stopText, styles.stopTextActive, { color: lineColor.primary }]}>
                {stop.name}
              </Text>
              <Text
                style={[
                  styles.stopStatus,
                  { color: lineColor.primary },
                ]}>{` ${statusStrings[stop.status]} `}</Text>
            </View>
          ) : (
            <View key={index} style={styles.stopContainer}>
              <Text style={styles.stopText}>{stop.name}</Text>
            </View>
          ),
        )}
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
  stopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 8,
    marginVertical: 2,
    borderRadius: 7,
  },
  stopText: {
    fontSize: 18,
    marginHorizontal: 6,
  },
  stopTextActive: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  stopStatus: {
    fontSize: 18,
    color: '#28a745',
  },
});

export default StopList;
