import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';
import BluetoothCP from 'react-native-bluetooth-cross-platform';
import { MonoText } from '../components/StyledText';
import { Github } from '../components/Github';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  serverId = "initialstateserver";
  clientId = "initialstateclient";

  render() { 
    return (

      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Button
            onPress={() => { 
              BluetoothCP.advertise('WIFI-BT'); 
              alert("broadcasting");

              BluetoothCP.addInviteListener(function(user) {
                // alert("Invited!");
                BluetoothCP.acceptInvitation(user.id);
                // alert("accepted");
                // alert(user.id);
                console.log("Server invited by client: ")
                console.log(user.id);
                // console.log("accepted");
                this.clientId = user.id;
              }.bind(this));

              BluetoothCP.addReceivedMessageListener(function(user) {
                //Parsing message
                console.log(user.message);
                alert(user.message);
                this.serverId = JSON.stringify(user.message);
              });

            }}
            title={"Broadcast server"}
          />

          <Button
            onPress={() => {
              alert(this.serverId);
              BluetoothCP.sendMessage("hello from server", this.clientId);
            }}
            title={"Send Message to Client"}
          />

          <View style={styles.welcomeContainer}>
            <Image
              source={                                                             
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <Button
            onPress={() => { 
              console.log("pressed");
              alert("Searching");
              BluetoothCP.browse();
              BluetoothCP.addPeerDetectedListener(function(user) {
                // console.log("addPeerDetectedListener");
                BluetoothCP.inviteUser(user.id);
                console.log("Client inviting server: "); 
                console.log(user.id);
                this.serverId = user.id;
              }.bind(this));

              BluetoothCP.addConnectedListener(function(user) {
                console.log("Server connected: ");
                console.log(user.id);
                BluetoothCP.sendMessage("Hello from client", user.id);
                console.log('message sent');
              });

              console.log(this.serverId);

              BluetoothCP.addPeerLostListener(function(user) {
                console.log(`Lost a peer: ${user.id}`);
                BluetoothCP.disconnectFromPeer(user.id);
              });

              BluetoothCP.addInviteListener(function(user) {
                BluetoothCP.acceptInvitation(user.id);
              });

              BluetoothCP.addReceivedMessageListener(function(user) {
                //Parsing message
                console.log(user.message);
                alert(user.message);
                this.serverId = JSON.stringify(user.message);
              });
            }}
            title={"Connect to Server"}
          />

          <Button
            onPress={() => {
              alert(this.clientId);
              BluetoothCP.sendMessage(this.clientId, this.serverId);
            }}
            title={"Send Message to Server"}
          />

          <Github
            html={this.props.screenProps.state.html}
            css={this.props.screenProps.state.css}
          />

        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
    lineNumber: {
  color: 'red'
    },
    currentLine: {
  backgroundColor: "blue"
    },
      container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
