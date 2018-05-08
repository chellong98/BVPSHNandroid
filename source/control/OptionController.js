import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert,BackHandler} from 'react-native';
 
import { NavigationActions } from 'react-navigation'; 
import OptionView from "../view/OptionView"
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import Stogare from '../util/Stogare';
export interface Props {
    navigation: any,
    data: any,
}
export interface State {}
export default class OptionController extends Component<Props, State> {
    constructor(props) {
        super(props);
        
        console.log(global.login)
        this.state = {
            data:{
                full_name:global.login.full_name,
                isLoad:false,
            }
        }

        var pack 
        if (global.login.user_type != 1)
        {
            pack = Package.getPatient(global.login.id);
        }
        else {
            pack = Package.getDocterDetail(global.login.d_id);
        }

        request = new ServerRequest(pack);
        request.setOnCompleted((cmd,json)=>{
        
            
            if (json.ERR_CODE!=0) return
            var data = json.DATA
            data.isLoad = true;
           day =  data.dob  
        
           if (day!=null)
           {
            splday = day.split(" ");
           /* if (day.length>2)
            {
                day = splday[2]+"/"+splday[1]+"/"+splday[0];
            }*/
            data.dob= splday[0];

           } 

            this.setState({data})
    
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

 
    return (   <OptionView {...this.props} data = {this.state.data} onPressUpdate = {(data)=>{this.onPressUpdate(data)} }/>  )
  }
  onPressUpdate(data)
  {
      var pack = {}
      
            if (global.login.user_type != 1)
            {   
                data.id = global.login.id;
                pack = Package.SavePatient(data);
                    
            }
            else{
                data.id = global.login.d_id;
                pack = Package.SaveDocter(data);
            }

            request = new ServerRequest(pack);
            request.setOnCompleted((cmd,json)=>{
            
                
                if (json.ERR_CODE!=0) 
                {
                    Alert.alert("Có lỗi xảy ra","Cập nhập thất bại. Hãy chắc chắn thông tin bạn nhập là hoàn toàn chính xác!")
                }
                else{
                    global.login.full_name = data.full_name
                    global.login.address = data.address
                    global.login.phone = data.phone
                    global.login.longitude= data.locate.longitude
                    global.login.latitude= data.locate.latitude
                    global.login.dob = data.dob;
                    Stogare.saveLogin( global.login);
                    Alert.alert("Cập nhập thành công","Cập nhập thông tin thành công!")
                }
                
        
            })
            request.execute();
  }
};
 