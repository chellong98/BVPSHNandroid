import { AppRegistry , PushNotificationIOS} from 'react-native';

import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";

import App from './control/App';
import Login from './control/LoginController';
import CustomDrawerNav from './control/CustomDrawerNav'
import Welcome from './control/Welcome';
import Register from './control/Register';
import WaitForm from './control/Wait';
import DoctorDetail from './control/DoctorDetail';
import DoctorActiveManagerController from './control/DoctorActiveManagerController';
import MapResultController from "./control/MapResultController"
import {Icon } from 'native-base';
import {View,TouchableOpacity } from 'react-native';
import HistoryBookingController from "./control/HistoryBookingController"
import LoginFB from "./control/LoginFBController"
import LoginChangeUserType from "./control/LoginChangeUserTypeController"
import OptionController from "./control/OptionController"
import Forget from "./control/ForgetController"
import TestUploadServer from "./control/TestUploadServer"


// config notification
var PushNotification = require('react-native-push-notification');
PushNotification.configure({
  onNotification: function(notification) {
},
  senderID: "1",
  permissions: {
      alert: true,
      badge: true,
      sound: true
  },
  popInitialNotification: true,

  requestPermissions: true,
});


// config global user
global.listNotic = {};
global.login = null;
global.lang =  "vi"

//config hide warning
console.disableYellowBox = true;


// config navigation
var navigationOptions = {
  contentComponent: props =>  ( <CustomDrawerNav {...props}> </CustomDrawerNav>),
  header: ({params}) => {
      right:
      <Button
      title = "Test"
      onPress = {() => this.params.handleSave() } />
    }

 };
 const doNotShowHeaderOption = {
  navigationOptions: {
    header: null,
  },
};


// drawer navigation
  const Drawer = DrawerNavigator({
  App: { screen: App }

  },navigationOptions );
  

  //stack navigation
  const stackNav = StackNavigator({
    Wait: {screen:WaitForm},
    Home: { screen: Drawer },
    Login: { screen: Login },
    Register:{screen: Register},
    Welcome:{screen: Welcome},
    DoctorDetail:{screen:DoctorDetail},
    DocterManage:{screen:DoctorActiveManagerController},
    MapResultController:{screen:MapResultController},
    HistoryBooking:{screen:HistoryBookingController},
    LoginFB:{screen:LoginFB},
    LoginChangeUserType:{screen:LoginChangeUserType},
    Option:{screen:OptionController},
    TEST:{screen:TestUploadServer},
    Forget:{screen:Forget},
  },
  {
    initialRouteName: "Wait",
    drawerPosition: 'right',
    navigationOptions: {
    gesturesEnabled: false,   header: null
  }
  });


  // start app
  AppRegistry.registerComponent('BVPSHN', () => stackNav);

/** Fix command react-native

npm i -g yarn
yarn add react-native@0.54.0-rc.3

*/
