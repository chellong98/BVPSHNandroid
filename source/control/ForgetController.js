
import React, { Component } from 'react';

import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import MapControl from "./MapControl";
import ForgetPaswordView from "../view/ForgetView"
import {color} from "../view/styles"
import { NavigationActions } from 'react-navigation';
import {View, AppRegistry, StatusBar,Image ,BackHandler  } from "react-native";
type Props = {};
export default class ForgetPasword extends Component<Props> {

  constructor(props) {
    
   super(props);
    this.state={
      step:1,
      accountID:0,
      accountCode:"Giaynhap",
    }

 
  
  }

  componentDidMount() {
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor(color.primary);
    StatusBar.setBarStyle('light-content', true);

 }
 onSubmit(account)
 {
  
   if (account==null|| account.length<1)
    this.view.alertError("Bạn cần nhập gmail khôi phục");
    else {
    
    
      this.state.accountCode = this.makeCode(5);
      request = new ServerRequest(Package.sendMail(account,"Mã xác nhận khôi phục mật khẩu của bạn là: "+this.state.accountCode ) );
      request.setOnCompleted((cmd,json)=>{

        if (json.ERR_CODE==1){
          this.view.alertError(json.Message);
        }else{
          this.state.accountID = json.DATA.id;
          this.setState({step:2})
        }

      })
      request.execute();
      this.view.nextStep()
      
      this.setState({step:2})
    }
    
 }
 resendCode(account)
 {
  request = new ServerRequest(Package.sendMail(account,"Mã xác nhận khôi phục mật khẩu của bạn là: "+this.state.accountCode ) );
  request.setOnCompleted((cmd,json)=>{

    if (json.ERR_CODE==1){
      this.view.alertError(json.Message);
      this.setState({step:1})
    }else{
      this.state.accountID = json.DATA.id;
      this.setState({step:2})
    }

  })
  request.execute();

 }
 onChangePassword(password,password2)
 {
   if (password!="" && password=== password2 )
   {
      request = new ServerRequest(Package.changePassword(this.state.accountID,password2 ));
      request.setOnCompleted((cmd,json)=>{
    
        this.props.navigation.dispatch(NavigationActions.back())
      })
      request.execute();
   }
   else{
    this.view.alertError("Mật khẩu xác nhận không khớp.");
   }
 }
  render() {

      return <ForgetPaswordView {...this.props} {...this.state}  onChangePassword = {(password,password2)=>{this.onChangePassword(password,password2)}} evenResend = {(account)=>this.resendCode(account)}onSubmit = {(account)=>{this.onSubmit(account)}}ref = {(ref)=>{this.view=ref}}/>
    
  }
  makeCode(ncode) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    for (var i = 0; i < ncode; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  

 

  componentWillMount() {
   
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  return true;
  };
 
}
