import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, Alert, ScrollView, AsyncStorage, StyleSheet, Dimensions} from 'react-native';

var axios = require('axios');
var base64 = require('base-64');


// GLOBAL VARS
BASEURL = 'https://api.github.com'; // this is for creation of repo
//BASEURL2 =  'https://api.github.com/repos/' // this is for adding of file to rep0

let exampleData = {
  name: 'facetestbook',
  description: 'This is your repository',
  homepage: 'https://github.com',
  private: false,
  has_issues: true,
  has_projects: true,
  has_wiki: true,
  auto_init: true,
};


let exampleData2 = {
  githubRepoName: 'facetestbook',
  githubFileName: 'index.html',
  message: 'A simple commit message',
  committer: {
    name: 'Some Cool guy',
    email: 'winning@nyu.edu',
  },
  content: base64.encode('#hello world!\n<h2>Testing 123</h2>\t<p>you are flat!</p>'),
};



export class Github extends React.Component {

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
    <TextInput
          style={{height: 40}}
          placeholder="Type Username"
          onChangeText={(text) =>
            this.saveData(text)}
        />
      <Button
        onPress = {() =>
          {
          //alert(JSON.stringify(this.state.myKey));
          //this.getRepos("kvn219");
        //  oneFunction(data1, data2)
          //this.createRepo("Rishub21", "vishnu21", exampleData);
          this.addFile("Rishub21", "vishnu21", exampleData2);
}
      }
      title={'github'}
      />
      <Text>
{JSON.stringify(this.state.error)}
</Text>
    </View>
    )
  }



getRepos(username) {

  let url = BASEURL + '/user';
  let configs = {
    'Access-Control-Allow-Origin': '*',
  };
  axios
    .get(url, configs)
    .then(res => {

      alert(1);
    })
    .catch((error) => {
      if (error.response) {
        this.setState({error:error.response.data});
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        this.setState({error:error.request});
        console.log(error.request);
      } else {
        this.setState({error:error.message});
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};


createRepo(username, password, data) {
  console.log('Creating repo...');
  let url = BASEURL + '/user/repos';
  const token = `${username}:${password}`;
  const hash = base64.encode(token);
  const basicAuth = 'Basic ' + hash;
  let configs = {
    'Access-Control-Allow-Origin': '*',
    headers: {
      Authorization: basicAuth,
    },
  };
  axios
    .post(url, data, configs)
    .then(res => {

      console.log(res.status);
    })
    .catch((error) => {
      this.setState({error:error.response.data});
      alert(url);
      console.log(url)
      // if (error.response) {
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      // } else if (error.request) {
      //   console.log(error.request);
      // } else {
      //   console.log('Error', error.message);
      // }
      // console.log(error.config);
    });
};


addFile(username, password, data) {
  console.log('Addding file to repo...');
  let url =
    BASEURL +
    '/repos/' +
    username +
    '/' +
    data.githubRepoName +
    '/contents/' +
    data.githubFileName;
  const token = `${username}:${password}`;
  const hash = base64.encode(token);
  const basicAuth = 'Basic ' + hash;
  let configs = {
    'Access-Control-Allow-Origin': '*',
    headers: {
      Authorization: basicAuth,
    },
  };
  axios
    .put(url, data, configs)
    .then(res => {
      console.log(res.status);
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

saveData(value){
  this.setState({"myKey": value});
}
getState(){
return this.state.myKey
}

}
