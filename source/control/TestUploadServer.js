import React, { Component } from 'react';
import { Alert  } from 'react-native'
 
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import Toolbar from "../view/toolbar";
import {Animated,View,Image,Text,Button,TouchableOpacity} from "react-native"
import DateTimePicker from 'react-native-modal-datetime-picker';

var ImagePicker = require('react-native-image-picker');
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
export default class TestUploadServer extends Component {


  constructor(props)
  {

    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
    this._showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    this._hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    this._handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  }

uploadPhoto(image,filename){
  request = new ServerRequest(Package.uploadImage(image,filename));
  request.setOnProgress((e)=>{

  })
  request.uploadImage();
   
}
  componentWillMount() {
    
  }  
  render() {
     return <View style={{padding:20}}>
     <TouchableOpacity style={{backgroundColor:'red'}}onPress={()=>{this._showDateTimePicker()}}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          date = {new Date()}
          mode = {'time'}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={()=>this._handleDatePicked()}
          onCancel={()=>this._hideDateTimePicker()}
        />
       
     </View>;
  }
   

}
