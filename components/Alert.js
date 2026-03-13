import { StyleSheet, Text, View } from 'react-native';
import AlertBadge from './AlertBadge';

const Alert = ({ lineColor, alertText, alertBadgeText, alertDescriptionText }) => {
	return (
		<View style={[styles.alertContainer, { backgroundColor: lineColor.lighter }]}>
			<Text
				style={[
					styles.alertHeadingText,
					styles.alertTextActive,
					{ color: lineColor.primary },
				]}>
				{alertText}
			</Text>
			<AlertBadge alertBadgeText={alertBadgeText} />
			<Text style={[styles.alertDescriptionText]}>{alertDescriptionText}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	alertContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		alignItems: 'center',
		paddingVertical: 8,
		marginVertical: 2,
		borderRadius: 7,
	},
	alertHeadingText: {
		fontWeight: 'bold',
		color: '#28a745',
		fontSize: 16,
		marginHorizontal: 6,
		marginBottom: 6,
		flexWrap: 'wrap',
		maxWidth: 240,
	},
	alertDescriptionText: {
		fontSize: 16,
		color: 'black',
		padding: 6,
	},
});

export default Alert;
