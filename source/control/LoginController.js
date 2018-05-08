import React, { Component } from 'react';
import { Alert ,BackHandler ,Keyboard} from 'react-native'
import view from "../view/LoginView";
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import Stogare from '../util/Stogare';
import {notic_1} from '../util/ManageNotification'
import  loginHelper from '../util/LoginHelper'
export default class LoginController extends Component {
  static navigationOptions = {
  header: null,
  };
  constructor(props)
  {
    super(props);
   //console.log(  global.status);
    view.onClickRegister = this.onPressRegister.bind(this);
    view.onClickLogin = this.onPressLogin.bind(this);
    view.evenLoginFacebook = this.onLoginFacebook.bind(this);
    view.onForget = this.onForget.bind(this);
  }
  async componentDidMount(){
  
  }

 
  render() {
    
     return view.render(this);
  }
  onForget()
  {
    this.props.navigation.navigate("Forget")
  }
  onLoginFacebook(data){

      request = new ServerRequest(Package.getInfoUsingAccesstoken(data.token) );
      request.setOnCompleted((cmd,json)=>{
          console.log(json)

          request = new ServerRequest(Package.LoginFB(json.id,json.name,json.id+"@facebook.com") );
          request.setOnCompleted((cmd,json)=>{
    
            console.log(json)
            this.props.navigation.navigate("LoginChangeUserType",{data:json.DATA})
       

          })
          request.execute();


      })
      request.execute();
  }

  onPressLogin()
  {
   
    if (!loginHelper.validateEmail(view.account))
    {
      Alert.alert("Lỗi!","Bạn cần nhập email đăng nhập")
      view.cancelLogin();
      return;
    }
    request = new ServerRequest(Package.Login(view.account,view.password));
    request.setOnCompleted((cmd,json)=>{
      this.onResultLogin(json);
    })
    request.execute();
    Keyboard.dismiss();
  }
  onPressRegister(){
    this.props.navigation.navigate("Register" );
    Keyboard.dismiss()
  }
  onResultLogin(json)
  {
    if (json.ERR_CODE==1)
    {
    Alert.alert(
      'Đăng nhập thất bại',
     json.Message);
     view.cancelLogin();
    }
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
    
    BackHandler.exitApp();    
  return true;
  };

}
