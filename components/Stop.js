import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

// const fadeAnimation = useAnimatedValue(0);
//
// const fadeIn = () => {
//   Animated.timing(fadeAnimation, {
//     toValue: 1,
//     duration: 500,
//     useNativeDriver: true,
//   }).start();
// };
//
// const fadeOut = () => {
//   Animated.timing(fadeAnimation, {
//     toValue: 0,
//     duration: 500,
//     useNativeDriver: true,
//   }).start();
// };

const statusStrings = {
  STOPPED_AT: '(Stopped at)',
  IN_TRANSIT_TO: '(In transit to)',
  INCOMING_AT: '(Incoming at)',
};

const Stop = ({ name, status, lineColor }) => {
  return status ? (
    <View style={[styles.stopContainer, { backgroundColor: lineColor.lighter }]}>
      <Text style={[styles.stopText, styles.stopTextActive, { color: lineColor.primary }]}>
        {name}
      </Text>
      <Text
        style={[
          styles.stopStatus,
          { color: lineColor.primary },
        ]}>{` ${statusStrings[status]} `}</Text>
    </View>
  ) : (
    <View style={styles.stopContainer}>
      <Text style={styles.stopText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingVertical: 8,
    marginVertical: 1,
    borderRadius: 7,
  },
  stopText: {
    fontSize: 16,
    marginHorizontal: 6,
    flexWrap: 'wrap',
    maxWidth: 240,
  },
  stopTextActive: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  stopStatus: {
    fontSize: 16,
    color: '#28a745',
  },
});

export default Stop;
