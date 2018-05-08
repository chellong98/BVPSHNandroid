import React, { Component } from 'react';
import { Alert ,BackHandler } from 'react-native'
 
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import Stogare from '../util/Stogare';
import LoginChangeUserTypeView from "../view/LoginChangeUserTypeView"
export default class LoginChangeUserTypeController extends Component {
  static navigationOptions = {
  header: null,
  };
  constructor(props)
  {
    super(props);

    this.data = this.props.navigation.state.params.data;
 
  }
  render() {
     return <LoginChangeUserTypeView data= {this.data }  pressContinue = {(value)=>{

     
      this.onContinue(value)
     }} />;
  }
  
  onContinue(value)
  {
    console.log(value)
    request = new ServerRequest(Package.UpUType(this.data.id,2-value));
    request.setOnCompleted((cmd,json)=>{
      global.login = json.DATA
      

      global.login.avartar = global.login.username.substr(0,global.login.username.indexOf("@"));
      this.props.navigation.navigate("Home");
      Stogare.saveLogin(global.login);

    })
    request.execute();
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
