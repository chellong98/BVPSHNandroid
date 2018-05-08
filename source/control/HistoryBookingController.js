import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation'; 
import HistoryBooking from './../view/HistoryBooking';
import {Alert,BackHandler} from 'react-native';
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import {USER} from "../util/Config"
export interface Props {
  navigation: any,
}
export interface State {}
export default class HistoryBookingController extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
    this.reLoad= this.reLoad.bind(this)
    this.reLoad()
   
  }
  reLoad()
  {
    var p = "p_id";
    var id = global.login.p_id
    if (global.login.user_type == USER.DOCTER) {
        id = global.login.d_id;
        p= "d_id"
    }

    request = new ServerRequest(Package.getBooking(id,p));
    request.setOnCompleted((cmd,json)=>{
        
       var list = json.DATA;
     
       this.setState({list})
   
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
    this.props.navigation.dispatch(NavigationActions.back())
  return true;
  };

 
  render() {
    return (
      <HistoryBooking reload = {()=>{ this.reLoad() }} navigation={this.props.navigation} data={this.state.list} onPressItem ={(data)=>{

        this.props.navigation.navigate("MapResultController",{id:data.id,reload:this.reLoad});
      }}/>
    )
  }
};