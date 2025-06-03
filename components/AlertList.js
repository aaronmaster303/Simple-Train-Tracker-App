import { StyleSheet } from 'react-native';
import { ScrollView, View, Text } from 'react-native';

const AlertList = ({ alertList, lineColor }) => {
  return (
    <View style={styles.viewContainer}>
      <ScrollView style={styles.scrollViewContainer} horizontal={false}>
        {alertList.map((alert, index) => (
          <View key={index} style={[styles.alertContainer, { backgroundColor: lineColor.lighter }]}>
            <Text
              style={[
                styles.alertHeadingText,
                styles.alertTextActive,
                { color: lineColor.primary },
              ]}>
              {alert.attributes.effect.replace(/_/g, ' ')}
            </Text>
            <Text style={[styles.alertDescriptionText]}>{alert.attributes.header}</Text>
          </View>
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
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  scrollViewContainer: {
    flex: 1,
  },
  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 8,
    marginVertical: 2,
    borderRadius: 7,
  },
  alertHeadingText: {
    fontWeight: 'bold',
    color: '#28a745',
    fontSize: 16,
    marginHorizontal: 6,
    marginBottom: 6,
    flexWrap: 'wrap',
    maxWidth: 240,
  },
  alertDescriptionText: {
    fontSize: 16,
    color: 'black',
    padding: 6,
  },
});

export default AlertList;
