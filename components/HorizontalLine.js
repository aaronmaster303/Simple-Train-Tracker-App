import { View, StyleSheet } from 'react-native';
import * as Colors from '../constants/Colors';

const HorizontalLine = () => {
	return <View style={styles.line} />;
};

const styles = StyleSheet.create({
	line: {
		height: 1,
		marginVertical: 1,
		backgroundColor: Colors.black,
	},
});

export default HorizontalLine;
