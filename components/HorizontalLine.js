import { View, StyleSheet } from 'react-native';

const HorizontalLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    marginVertical: 1,
  },
});

export default HorizontalLine;
