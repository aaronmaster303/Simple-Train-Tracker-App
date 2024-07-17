import { StyleSheet } from 'react-native';
import { ScrollView, View, Text } from 'react-native';

const StopList = ({ stopList }) => {
  return (
    <ScrollView style={styles.scrollContainer}>
      {stopList.map((stop, index) => (
        <View key={index} style={styles.stopContainer}>
          <Text style={stop.status ? styles.stopTextActive : styles.stopText}>{stop.name}</Text>
          {stop.status && <Text style={styles.stopStatus}>{`(${stop.status})`}</Text>}
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
  stopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  stopText: {
    fontSize: 18,
  },
  stopTextActive: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  stopStatus: {
    fontSize: 16,
    color: '#28a745',
  },
});

export default StopList;
