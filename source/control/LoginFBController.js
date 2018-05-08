
import React, { Component } from 'react';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';


import LoginFbView from "../view/LoginFbView"
 
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import { NavigationActions } from 'react-navigation';
import RequetLocationPermission from "../util/Permission"
import {BackHandler,View} from "react-native"
 
import Stogare from '../util/Stogare';
type Props = {};
export default class LoginFBController extends Component<Props> {


  constructor(props) {
   super(props);
   this.state = {
     map:null,
     loading:false
   }
 
  }
  onLoginFacebook(data){
    var loading = true;
    this.setState({loading});
    request = new ServerRequest(Package.getInfoUsingAccesstoken(data.token) );
    request.setOnCompleted((cmd,json)=>{
        console.log(json)

        request = new ServerRequest(Package.LoginFB(json.id,json.name,json.id+"@facebook.com") );
        request.setOnCompleted((cmd,json)=>{
          var loading = false;
          this.setState({loading});
          console.log(json)
          this.props.navigation.navigate("LoginChangeUserType",{data:json.DATA})
     

        })
        request.execute();


    })
    request.execute();
}
  render() {
    return ( <LoginFbView {...this.props}  loading = {this.state.loading} onLoginFacebook = {(data)=>(this.onLoginFacebook(data))}/>
    );
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
