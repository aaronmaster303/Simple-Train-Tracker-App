import { StyleSheet, Text } from 'react-native';
import * as Colors from '../constants/Colors';

const Header = () => {
	return <Text style={styles.headerText}>MBTA Train Tracker</Text>;
};

const styles = StyleSheet.create({
	headerText: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 0,
		backgroundColor: 'white',
		color: Colors.black,
	},
});

export default Header;
