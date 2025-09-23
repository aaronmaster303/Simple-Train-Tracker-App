import { StyleSheet, Text } from 'react-native';
import { alertBadgeColors } from '../constants/Colors';

const AlertBadge = ({ alertBadgeText }) => {
	return (
		<Text style={[styles.main, { backgroundColor: alertBadgeColors[alertBadgeText] }]}>
			{alertBadgeText}
		</Text>
	);
};

const styles = StyleSheet.create({
	main: {
		borderRadius: 20,
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginVertical: 2,
		fontSize: 12,
		fontWeight: 'bold',
		marginLeft: 6,
	},
});

export default AlertBadge;
