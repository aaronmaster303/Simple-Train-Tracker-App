import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ text, isActive, buttonPressedFunction, lineColor }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive && styles.buttonActive && { backgroundColor: lineColor?.primary },
        !isActive && styles.buttonInactive,
      ]}
      onPress={() => buttonPressedFunction()}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    shadowColor: 'darkgray',
    shadowRadius: 1,
    shadowOffset: 1,
    shadowOpacity: 1,
    borderRadius: 7,
  },
  buttonActive: {
    backgroundColor: '#28a745',
  },
  buttonInactive: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Button;
