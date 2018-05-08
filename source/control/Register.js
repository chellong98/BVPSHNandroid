import React, { Component } from 'react';
import { Alert  } from 'react-native'

import view from "../view/Register";

import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import Toolbar from "../view/toolbar";
import Lang from '../util/Language';
import  loginHelper from '../util/LoginHelper'
import {BackHandler} from "react-native"
import { NavigationActions } from 'react-navigation';
Lang.form="Register"
export default class Register extends Component {


  constructor(props)
  {

    super(props);
    view.parent = this;
    view.navigation = this.props.navigation;
    view.onClickRegister = this.onCLick.bind(this);


  }
  render() {
     return view.render(this);
  }
  

  onCLick(){
    if (view.password=="" ||  view.account == ""){
      Alert.alert("Lỗi!","Tài khoản mật khẩu không được bỏ trống ")
        return ;
      
    }
    if (view.password!=view.password2)
    {
      Alert.alert("Lỗi!","Mật khẩu xác nhận không đúng")
      return ;
    }
    if (!loginHelper.validateEmail(view.account))
    {
      Alert.alert("Lỗi!","Bạn cần nhập email đăng nhập")
     
      return;
    }

      info={

        username:view.account,  
        password:view.password,
        full_name:view.name,
        address:view.address,
        phone:view.phonenumber,
        email:view.account,
        gender:(1-view.gender),
        user_type:(2-view.usertype)

      }
      request = new ServerRequest(Package.Register(info));
      request.setOnCompleted((cmd,json)=>{
        this.onResult(json);
      })
      request.execute();
  }
  onResult(json)
  {
    if (json.ERR_CODE==1)
    Alert.alert(
      Lang.get("titleError"),
     json.Message);
     else
     {
       global.login = json.DATA
       Alert.alert(
         Lang.get("titleSuccess"),
        json.Message);
        this.props.navigation.navigate("Login",json.DATA);

     }

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
