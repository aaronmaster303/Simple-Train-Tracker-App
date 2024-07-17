import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ text, isActive, buttonPressedFunction }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.buttonActive]}
      onPress={() => buttonPressedFunction()}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonActive: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Button;
