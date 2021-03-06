import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, TabBarTop } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import CodeScreen from '../screens/CodeScreen';
import KeyboardScreen from '../screens/KeyboardScreen';
import OutputScreen from '../screens/OutputScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default TabNavigator(
    {
    	Home: {
		    screen: HomeScreen,
		},
		Keyboard: {
		    screen: KeyboardScreen,
		},
		Code: {
		    screen: CodeScreen,
		},
		Output: {
		    screen: OutputScreen,
		},
		Settings: {
		    screen: SettingsScreen,
		},

    },
    {
	navigationOptions: ({ navigation }) => ({
	    tabBarIcon: ({ focused }) => {
		const { routeName } = navigation.state;
		let iconName;
		switch (routeName) {
			case 'Home':
			iconName =
			    Platform.OS === 'ios'
			    ? `ios-grid${focused ? '' : '-outline'}`
			    : 'md-grid';
			break;
		    case 'Keyboard':
			iconName =
			    Platform.OS === 'ios'
			    ? `ios-grid${focused ? '' : '-outline'}`
			    : 'md-grid';
			break;
		    case 'Code':
			iconName =
			    Platform.OS === 'ios'
			    ? `ios-menu${focused ? '' : '-outline'}`
			    : 'md-menu';
			break;
		    case 'Output':
			iconName =
			    Platform.OS === 'ios'
			    ? `ios-phone-portrait${focused ? '' : '-outline'}`
			    : 'md-phone-portrait';
			break;
			case 'Settings':
			iconName =
			    Platform.OS === 'ios'
			    ? `ios-bulb${focused ? '' : '-outline'}`
			    : 'md-phone-portrait';
			break;
		}
		return (
		    <Ionicons
			name={iconName}
			size={28}
			style={{ marginBottom: -3 }}
			color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
		    />
		);
	    },
	}),
	tabBarComponent: TabBarBottom,
	tabBarPosition: 'top',
	animationEnabled: false,
	swipeEnabled: false,
    }
);
