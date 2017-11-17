import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, Alert, ScrollView, AsyncStorage, StyleSheet, Dimensions} from 'react-native';

let stringer = "";
let data = {string: ''};

export class DeleteButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      NewBoard: '',
      FinalBoard : 'not ready',
    };
  }

  render(){
    return(
    <View>
      <Button
        style = {styles.textbox}
        onPress = {() => {
          //AsyncStorage.setItem("KeyBoard2", "A");
            const newLetter = " ";

            data.string = data.string.slice(0,-1);

            this.props.onPress();
          }
        }
        title = " DELETE "
      />

    </View>
    )
  }
}


const styles  = StyleSheet.create({
  boxrow: {
    flexDirection: "row",

  },

  container : {
    flex : 1,
    flexDirection : "row",
    flexWrap : "wrap",
    padding : 2,
  },
  box : {
    flex : 1,
    justifyContent : "space-between",
    //width : Dimensions.get('window').width,

  },

  textbox : {
    width : Dimensions.get('window').width / 10
  }
});
