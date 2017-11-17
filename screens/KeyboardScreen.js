import React from 'react';
import {
    TextInput,
    AsyncStorage,
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import {Keyboard} from '../components/Keyboard';
import {TypeButton} from '../components/TypeButton';


export default class KeyboardScreen extends React.Component {
    constructor(){
	super();
    }

    static navigationOptions = {
	header: null,
    };

    render() {
	return (
	    <View style={styles.container}>
		<ScrollView style={styles.container}
			    contentContainerStyle={styles.contentContainer}
			    bounce={false}
			    alwaysBounceVertical={false}
			    keyboardShouldPersistTaps={'always'}
		>
		    <Text>
			line {this.props.screenProps.currentLine}
		    </Text>
		    <TextInput
			style={styles.textInput}
			defaultValue={this.props.screenProps.currentCode}
			placeholder={'new line'}
			onChangeText={(text) => {
				this.props.screenProps.events.next(
				    {
					action: 'change_line',
					value: text
				    });
			}}
			autoCapitalize={'none'}
			autoFocus={false}
			blurOnSubmit={false}
		    />

		    <View style={styles.boxrow}>
			<View
			    style={styles.button}>
			    <Button
				onPress={() => {
					this.props.screenProps.events.next(
					    {
						action: 'insert_line',
						value: null
					});
				}}
				title={"insert line"}
			    />
			</View>
			<View
			    style={styles.button}>			
			    <Button
				onPress={() => {
					this.props.screenProps.events.next(
					    {
						action: 'kill_line',
						value: null
					    });
				}}
				title={"kill line"}
			    />
			</View>
		    </View>

		    <View style={styles.boxrow}>
			<View
			    style={styles.button}>
			    <Button
				onPress={() => {
					this.props.screenProps.events.next(
					    {
						action: 'key_arrow_up',
						value: null
					});
				}}
				title={"↑"}
			    />
			</View>
			<View
			    style={styles.button}>			
			    <Button
				onPress={() => {
					this.props.screenProps.events.next(
					    {
						action: 'key_arrow_down',
						value: null
					});
				}}
				title={"↓"}
			    />
			</View>
		    </View>
		</ScrollView>
	    </View>
	);
    }
}

const styles = StyleSheet.create({
    lineNumber: {
	flex: 1,
	color: 'red'
    },
    currentLine: {
	backgroundColor: "blue"
    },
    boxrow: {
	flexDirection: "row",
	alignItems: 'flex-end'
    },
    textInput: {
	fontSize: 50,
	height: 80,
	borderColor: 'gray',
	borderWidth: 1,
	paddingLeft: 2
    },
    button: {
	flex: 1,
	borderColor: 'red',
	borderWidth: 1,
	padding: 10
    },
    container: {
	flex: 1,
	paddingLeft: 2,
	paddingRight: 2,
	backgroundColor: '#fff',
    },
    contentContainer: {
	paddingTop: 30,
    }
});
