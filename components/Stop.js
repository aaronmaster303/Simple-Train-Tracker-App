import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

const statusStrings = {
	STOPPED_AT: '(Stopped at)',
	IN_TRANSIT_TO: '(In transit to)',
	INCOMING_AT: '(Incoming at)',
};

const Stop = ({ name, lineColor, status, prediction }) => {
	return (
		<View>
			{status ? (
				<View style={[styles.stopContainer, { backgroundColor: lineColor.lighter }]}>
					<Text
						style={[
							styles.stopText,
							styles.stopTextActive,
							{ color: lineColor.primary },
						]}>
						{name}
					</Text>
					<Text style={[styles.stopStatus, { color: lineColor.primary }]}>
						{` ${statusStrings[status]} `}
					</Text>
					{prediction ? (
						<Text style={[styles.stopStatus, { color: lineColor.primary }]}>
							{` ${prediction.minutes}:${prediction.seconds} `}
						</Text>
					) : (
						<></>
					)}
				</View>
			) : (
				<View style={styles.stopContainer}>
					<Text style={styles.stopText}>{name}</Text>
					{prediction ? (
						<Text style={[styles.stopStatus, { color: lineColor.primary }]}>
							{` ${prediction.minutes}:${prediction.seconds} `}
						</Text>
					) : (
						<></>
					)}
				</View>
			)}
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
});

export default Stop;
