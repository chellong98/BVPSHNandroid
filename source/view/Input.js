
import { Text,Container, Header, Content, Card, CardItem,Item, Body,Button,Label,Right, Radio,List,ListItem,Form ,Input} from 'native-base';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import {
  Platform,
  StyleSheet,

  View,
  TextInput,


  TouchableOpacity,
  Image
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import Icon from 'native-base';
import React, { Component } from 'react';
export interface Props {

}
 
export default class DialogConfirmBooking extends Component<Props> {
  constructor(props)
  {

      super(props);
      this.date = new Date();
     
     
  }


    render() {
         
        return (<View style={{flexDirection: 'column',alignContent:'flex-start',flex:1}}>
                
               {this. renderLabel()}
                <Input  style={{flex:1}} underline={false}  {...this.props}    />
        </View>
                   

        )
      
    }
    renderLabel()
    {
        if (this.props.title!=null) return  <Label style={{flex:1, fontSize:14}}>{this.props.title}</Label>;
    }
    
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 70,
        flexDirection: 'column',
    },
    bodyHeader: {   marginRight: 100, },
    body:{flex: 4/10, backgroundColor: '#EAEAEA'}
})
