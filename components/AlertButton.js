import { StyleSheet } from 'react-native';
import { Pressable, Text } from 'react-native';

const AlertButton = ({ showAlerts, toggleAlertsButtonFunction }) => {
	return (
		<Pressable style={[styles.main]} onPress={() => toggleAlertsButtonFunction(!showAlerts)}>
			{showAlerts ? (
				<Text style={styles.buttonText}>❌</Text>
			) : (
				<Text style={styles.buttonText}>⚠️</Text>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	main: {
		position: 'absolute',
		right: 14,
		top: 6,
		zIndex: 2,
	},
	buttonText: {
		fontSize: 18,
	},
});

export default AlertButton;
