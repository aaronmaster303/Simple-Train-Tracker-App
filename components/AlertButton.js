import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const AlertButton = ({ anyAlerts, showAlerts, toggleAlertsButtonFunction }) => {
	if (anyAlerts) {
		return (
			<Pressable onPress={() => toggleAlertsButtonFunction(!showAlerts)}>
				{showAlerts ? (
					<Ionicons name="close" size={24} color="red" />
				) : (
					<Ionicons name="warning" size={24} color="goldenrod" />
				)}
			</Pressable>
		);
	}

	return <Ionicons name="alert" size={24} color="white" />;
};

export default AlertButton;
