import { StyleSheet, Text } from 'react-native';

const Footer = ({ isFailing, isTrain }) => {
  const vehicle = isTrain ? 'train' : 'bus';

  return isFailing ? (
    <Text style={[styles.footer, styles.failing]}>Error fetching {vehicle} locations.</Text>
  ) : (
    <Text style={styles.footer}>Displaying all {vehicle} locations.</Text>
  );
};

const styles = StyleSheet.create({
  footer: {
    color: 'green',
    textAlign: 'center',
    marginTop: 14,
    fontSize: 16,
  },
  failing: {
    color: 'red',
  },
});
export default Footer;
