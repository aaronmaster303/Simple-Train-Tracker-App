import { StyleSheet, Text, View, Switch } from 'react-native';

const Toggle = ({ isTrain, toggleSetFunction }) => {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchLabel}>Train</Text>
      <Switch value={isTrain} onValueChange={(value) => toggleSetFunction(value)} />
      <Text style={styles.switchLabel}>Bus</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  switchLabel: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default Toggle;
