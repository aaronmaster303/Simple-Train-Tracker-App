import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const HelpButton = ({ toggleHelpFunction, showHelp }) => {
	return (
		<Pressable onPress={() => toggleHelpFunction(!showHelp)}>
			{showHelp ? (
				<Ionicons name="close" size={24} color="red" />
			) : (
				<Ionicons name="help-circle-outline" size={24} color="dimgrey" />
			)}
		</Pressable>
	);
};

export default HelpButton;
