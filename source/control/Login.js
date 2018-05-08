import React, { Component } from 'react';
import { Alert ,BackHandler } from 'react-native'

import view from "../view/Login";

import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import Stogare from '../util/Stogare';

export default class Login extends Component {
  static navigationOptions = {
  header: null,
  };
  constructor(props)
  {
    super(props);
    
    view.onClickRegister = this.onPressRegister.bind(this);
    view.onClickLogin = this.onPressLogin.bind(this);
  }
  render() {
     return view.render(this);
  }
  onPressLogin()
  {
    request = new ServerRequest(Package.Login(view.account,view.password));
    request.setOnCompleted((cmd,json)=>{
      this.onResultLogin(json);
    })
    request.execute();
  }
  onPressRegister(){
  this.props.navigation.navigate("Register" );
  }
  onResultLogin(json)
  {
    if (json.ERR_CODE==1)
    Alert.alert(
      'Đăng nhập thất bại',
     json.Message);
     else
     {
        global.login = json.DATA
        this.props.navigation.navigate("Home");
        Stogare.saveLogin(json.DATA);
     }
  }
  
  componentWillMount() {
   
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
  return true;
  };

}
