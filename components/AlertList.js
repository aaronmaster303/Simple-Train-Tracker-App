import { StyleSheet } from 'react-native';
import { ScrollView, View, Text } from 'react-native';
import AlertBadge from './AlertBadge';
import Alert from './Alert';

const AlertList = ({ alertList, lineColor }) => {
  return (
    <View style={styles.viewContainer}>
      <ScrollView style={styles.scrollViewContainer} horizontal={false}>
        {alertList.map((alert, index) => (
          <Alert
            lineColor={lineColor}
            alertText={alert.attributes.effect.replace(/_/g, ' ')}
            alertBadgeText={alert.attributes.lifecycle}
            alertDescriptionText={alert.attributes.header}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  scrollViewContainer: {
    flex: 1,
  },
});

export default AlertList;
