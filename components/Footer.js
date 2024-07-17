import { StyleSheet, Text } from 'react-native';

const Footer = ({ isFailing }) => {
  if (isFailing) {
    return <Text style={[styles.footer, styles.failing]}>Error fetching train locations.</Text>;
  }
  return <Text style={styles.footer}>Displaying all train locations.</Text>;
};

const styles = StyleSheet.create({
  footer: {
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  failing: {
    color: 'red',
  },
});
export default Footer;
