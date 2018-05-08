import React, { Component } from 'react';
import { Alert  } from 'react-native'
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import DoctorManagerTabView from "../view/DoctorManagerTabView";
import { Container, Header, Tab, Tabs } from 'native-base';
export default class DoctorManagerTabControl extends Component {
 
  constructor(props)
  {
    super(props);
 
  }
  onPressItem(value)
  {
    if ( this.props.onPressItem!=null)
    {
      this.props.onPressItem(value)
    }
  }
  render() {

     return(<DoctorManagerTabView listreload = {this.props.listreload} onPressItem = {(value)=>{this.onPressItem(value)}} data = {this.props.data}  filter = {this.props.filter} /> )
    
    
    }



}
