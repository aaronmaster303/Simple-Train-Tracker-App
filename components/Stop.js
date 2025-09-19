import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

const statusStrings = {
	STOPPED_AT: '(Stopped at)',
	IN_TRANSIT_TO: '(In transit to)',
	INCOMING_AT: '(Incoming at)',
};

const stopTimeElement = (name, stopTime, lineColor) => {
	return (
		<View style={[styles.selectedStopContainer, { backgroundColor: lineColor.primary }]}>
			<Text style={[styles.stopText, styles.stopTextActive, styles.stopTimeColor]}>
				{name}
			</Text>
			<Text
				style={[
					styles.stopStatus,
					styles.stopTextActive,
					styles.stopTimeColor,
					{ marginHorizontal: 12 },
				]}>
				{formatTime(stopTime.minutes, stopTime.seconds)}
			</Text>
		</View>
	);
};

const activeStopElement = (name, status, lineColor) => {
	return (
		<View style={[styles.stopContainer, { backgroundColor: lineColor.lighter }]}>
			<Text style={[styles.stopText, styles.stopTextActive, { color: lineColor.primary }]}>
				{name}
			</Text>
			<Text style={[styles.stopStatus, { color: lineColor.primary }]}>
				{` ${statusStrings[status]} `}
			</Text>
		</View>
	);
};

const defaultStopElement = (name) => {
	return (
		<View style={[styles.stopContainer]}>
			<Text style={[styles.stopText]}>{name}</Text>
		</View>
	);
};

const formatTime = (minutes, seconds) => {
	return `➔ ${minutes <= 1 ? '1' : minutes}min`;
};

const Stop = ({ name, lineColor, status, stopTime }) => {
	return (
		<View>
			{stopTime && Object.keys(stopTime).length > 0
				? stopTimeElement(name, stopTime, lineColor)
				: status
					? activeStopElement(name, status, lineColor)
					: defaultStopElement(name)}
		</View>
	);
};

const styles = StyleSheet.create({
	stopContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 8,
		marginVertical: 1,
		borderRadius: 7,
		flexWrap: 'wrap',
	},
	selectedStopContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 8,
		marginVertical: 1,
		borderRadius: 7,
		flexWrap: 'wrap',
	},
	stopText: {
		fontSize: 16,
		marginHorizontal: 6,
		flexWrap: 'wrap',
		flexShrink: 1,
		flexGrow: 1,
	},
	stopTextActive: {
		fontWeight: 'bold',
	},
	stopStatus: {
		fontSize: 16,
		color: '#28a745',
		marginHorizontal: 6,
	},
	stopTimeColor: {
		color: 'white',
	},
});

export default Stop;
