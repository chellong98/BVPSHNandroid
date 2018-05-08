
import React, { Component } from 'react';

import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import MapControl from "./MapControl";
import DoctorActiveManagerController from "./DoctorActiveManagerController"
import {color} from "../view/styles"
import {Container} from "native-base"
import {View, AppRegistry, StatusBar,Image ,BackHandler  } from "react-native";
type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
   super(props);

   global.homeKey =this.props.navigation.state
  }
  componentDidMount() {
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor(color.primary);
    StatusBar.setBarStyle('light-content', true);

 }
  render() {


   
    if (global.login==null){this.props.navigation.navigate("Login");

    return (<Container style={{backgroundColor:color.primary,alignItems:'center',justifyContent:'center'}} >
               <Image style= {{width:300,height:300}} source = {require("../../ic_login_app.png")} /> 
            </Container>)
    }
    if (global.login.user_type==1)
    {
      this.props.navigation.navigate("DocterManage");
      return (<Container style={{backgroundColor:color.primary,alignItems:'center',justifyContent:'center'}} >
      <Image style= {{width:300,height:300}} source = {require("../../ic_login_app.png")} /> 
   </Container>)

    }
    else if (global.login.user_type!=1)
    {
        // this.props.navigation.navigate("MapResultController",{id:119});
         return ( <MapControl {...this.props} /> );
    }
    else {
      return (<Container style={{backgroundColor:color.primary,alignItems:'center',justifyContent:'center'}} >
      <Image style= {{width:300,height:300}} source = {require("../../ic_login_app.png")} /> 
   </Container>)
    }

  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    BackHandler.exitApp();    
  return true;
  };
}
