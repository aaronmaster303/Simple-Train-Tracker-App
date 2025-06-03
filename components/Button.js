import { View } from 'react-native';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Button;
