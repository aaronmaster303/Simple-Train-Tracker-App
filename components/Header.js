import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
  return <Text style={styles.headerText}>MBTA Train Tracker</Text>;
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0,
    zIndex: 1,
    backgroundColor: 'white',
  },
});
export default Header;
