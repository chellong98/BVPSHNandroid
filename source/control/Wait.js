import React, { Component } from 'react';
import { Alert  } from 'react-native'
import Stogare from '../util/Stogare';
import { AsyncStorage, Text, View, TextInput, StyleSheet,ActivityIndicator,Image } from 'react-native'
import {Container} from 'native-base'
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import {color} from "../view/styles"

export default class WaitForm extends Component {
 
  constructor(props)
  {
    super(props);
    var firstForm = "";
    var parent = this;
    Stogare.isFirst().then(function(result) {
        var isFirst =result;
        Stogare.getLogin().then(function(dbLogin) {
          global.login = dbLogin;
       
           parent.onRequested(isFirst,dbLogin)
          
        });
    });


  }
  render() {
  
     return (<Container style={{backgroundColor:color.primary,alignItems:'center',justifyContent:'center'}} >
               <Image style= {{width:300,height:300}}source = {require("../../ic_login_app.png")} /> 
            </Container>)
  }

  onCompleted(isFirst,dbLogin)
  {
    var firstForm ="Login"
      if (isFirst ) {firstForm = "Welcome";
      Stogare.setfirst();
      }
      else if (dbLogin!=null)
      {
        global.login = dbLogin;
        firstForm = "Home"
      }

      this.props.navigation.navigate(firstForm);
  }
  
  onRequested(isFirst,dbLogin)
  {
    
   this.getSetting(isFirst,dbLogin)
  }
  getSetting(isFirst,dbLogin){

   request = new ServerRequest(Package.getSetting());
   request.setOnCompleted((cmd,json)=>{
     try{
    var rtn = {}
    for (var k in json.DATA)
    {
      data = json.DATA[k]
      rtn[data.SETTING_KEY] = data.VALUES_KEY;
    }
      global.setting = rtn;
      this.onCompleted(isFirst,dbLogin)
  } catch(e)
  {
    
  }
   })
   request.execute();
  }

}
