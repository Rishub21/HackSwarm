import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, Alert, ScrollView, AsyncStorage, StyleSheet, Dimensions} from 'react-native';

let stringer = "";
let data = {string: ''};

class TypeButton extends Component {

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
            const current = this.state.NewBoard;
            const newLetter = this.props.letter;
            const isCap = this.props.isCap;

            data.string = data.string + newLetter;

            this.props.onPress();
          }
        }
        title = {this.props.letter}
      />

    </View>
    )
  }
}

export default class RealBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NewBoard: '',
      FinalBoard : 'not ready',
      IsCaps : false,
      IsNumber : false,
    };
  }

  _onPress = () => {
    this.setState(this.state);
  }

  render() {
    //Alert.alert(stringer)
    var numerals = ["1","2","3","4","5","6","7","8","9","0"];

    var lower_buttons0 = ["q", "w", "e", "r","t", "y", "u", "i", "o", "p", "{", "}"];
    var lower_buttons1 = ["a", "s", "d", "f","g", "h", "j", "k", "l", ":", '"',";" ,  "<", ">"];
    var lower_buttons2 = ["z", "x", "c", "v","b", "n", "m", ",", ".", "?"];

    var upper_buttons0 = ["Q", "W", "E", "R","T", "Y", "U", "I", "O", "P","{", "}"];
    var upper_buttons1 = ["A", "S", "D", "F","G", "H", "J", "K", "L",":", '"',";", "<", ">"];
    var upper_buttons2 = ["Z", "X", "C", "V","B", "N", "M", ",", ".", "?"];

    var number = numerals.map((letter) => {
      return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
    })
    var lb0= lower_buttons0.map((letter) => {
      return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
    })
    var lb1= lower_buttons1.map((letter) => {
      return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
    })
    var lb2= lower_buttons2.map((letter) => {
      return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
    })


    var ub0= upper_buttons0.map((letter) => {
      return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
    })
    var ub1= upper_buttons1.map((letter) => {
      return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
    })
    var ub2= upper_buttons2.map((letter) => {
      return <TypeButton key={letter} onPress={this._onPress} letter={letter}  ></TypeButton>;
    })

   if(this.state.IsNumber){
     element = <View style = {styles.box}>
     <View style = {styles.boxrow}>
       {number}
     </View>
    </View>

   }


    if(this.state.IsCaps && !this.state.IsNumber){
      element = <View style = {styles.box}>
      <View style = {styles.boxrow}>
        {ub0}
      </View>
      <View style = {styles.boxrow}>
        {ub1}
      </View>
      <View style = {styles.boxrow}>
        {ub2}
        <Button
          style = {styles.textbox}
          onPress = {() => {
            //AsyncStorage.setItem("KeyBoard2", "A");
            Alert.alert("pressed")
            }
          }
          title = {"←"}
        />
        <Button
          style = {styles.textbox}
          onPress = {() => {
            //AsyncStorage.setItem("KeyBoard2", "A");
            Alert.alert("pressed")
            }
          }
          title = {" ↑ "}
        />
        <Button
          style = {styles.textbox}
          onPress = {() => {
            //AsyncStorage.setItem("KeyBoard2", "A");
            Alert.alert("pressed")
            }
          }
          title = {"→ "}
        />
        <Button
          style = {styles.textbox}
          onPress = {() => {
            //AsyncStorage.setItem("KeyBoard2", "A");
            Alert.alert("pressed")
            }
          }
          title = {"↓"}
        />
      </View>


      </View>;
    }

    else if (!this.state.IsCaps && !this.state.IsNumber){
      element = <View style = {styles.box}>
      <View style = {styles.boxrow}>
        {lb0}
      </View>
      <View style = {styles.boxrow}>
        {lb1}
      </View>
      <View style = {styles.boxrow}>
        {lb2}
        <Button
          style = {styles.textbox}
          onPress = {() => {
            //AsyncStorage.setItem("KeyBoard2", "A");
            Alert.alert("pressed")
            }
          }
          title = {"←"}
        />
        <Button
          style = {styles.textbox}
          onPress = {() => {
            //AsyncStorage.setItem("KeyBoard2", "A");
            Alert.alert("pressed")
            }
          }
          title = {" ↑ "}
        />
        <Button
          style = {styles.textbox}
          onPress = {() => {
            //AsyncStorage.setItem("KeyBoard2", "A");
            Alert.alert("pressed")
            }
          }
          title = {"→"}
        />
        <Button
          style = {styles.textbox}
          onPress = {() => {
            //AsyncStorage.setItem("KeyBoard2", "A");
            Alert.alert("pressed")
            }
          }
          title = {"↓"}
        />
      </View>
      </View>;
    }

    return (


    <View>


      {element}
      <Button
        onPress = {() => {
            currentBool = this.state.IsCaps;
            this.setState({"IsCaps": !currentBool});
          }
        }
        title = "CAPS"
      />
      <Button
        onPress = {() => {
            currentNum = this.state.IsNumber;
            this.setState({"IsNumber": !currentNum});
          }
        }
        title = "Number"
      />




      <Text> {data.string} </Text>

    </View>
    );
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
