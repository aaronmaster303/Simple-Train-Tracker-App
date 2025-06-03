import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const Button = ({ text1, text2, isActive, buttonPressedFunction, lineColor }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive && styles.buttonActive && { backgroundColor: lineColor?.primary },
        !isActive && styles.buttonInactive,
      ]}
      onPress={() => buttonPressedFunction()}>
      <Text style={styles.buttonText}>{text1}</Text>
      <View style={styles.stopNameContainer}>
        <Text style={styles.buttonText2}>{text2}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 7,
    margin: 2,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 150,
  },
  buttonActive: {
    backgroundColor: '#28a745',
  },
  buttonInactive: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginEnd: 10,
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flexWrap: 'wrap',
  },
  stopNameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
