import React,{Component} from "react";
import {View, AppRegistry, StatusBar,Image  } from "react-native";
import { Container, Content, Text, List, ListItem} from "native-base";
import LoginHelper from "../util/LoginHelper"

import DrawerView from "../view/DrawerView"

import {routes} from "../util/Config"

export default class CustomDrawerNav extends React.Component {
  static navigationOptions = {
  header: null,
  drawerLabel: () => null
  };
  constructor(props){
    super(props);
    this.state = {
      full_name:"",
      username:"",
      distric:""
    }
  
  }

    render() {
      if (global.login!=null&&global.login.full_name!=null) 
      {
      this.state.full_name = global.login.full_name
      this.state.distric = global.login.address
      this.state.user_type = global.login.user_type
      this.state.username = global.login.username
      
      }
        return  (<DrawerView data = {this.props.data} navigation = {this.props.navigation} user = {{image: global.login.avartar,full_name:this.state.full_name,distric:this.state.distric,user_type:this.state.user_type,username:this.state.username }} routes = {routes}/>)
    }
  }

  export {routes}