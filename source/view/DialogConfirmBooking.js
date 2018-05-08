
import { Container, Content, Text, List, ListItem,Thumbnail, Header , Body, Item,Button,Left, SwipeRow} from "native-base";
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import {
  Platform,
  StyleSheet,

  View,
  TextInput,

    Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import Input from "./Input"
import DateTimePicker from 'react-native-modal-datetime-picker';

import {Icon, Toast} from 'native-base';
import React, { Component } from 'react';
export interface Props {

}
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

export default class DialogConfirmBooking extends Component<Props> {
  constructor(props)
  {

      super(props);
      this.date = new Date();
      this.state = {
          
          time:this.date.getHours()+":00",
          "date":("0" + this.date.getDate() ).slice(-2)+"/"+("0" +this.date.getMonth()).slice(-2) +"/"+this.date.getFullYear() ,
          "d_id":"",
          dialogPickertype:'date',
          isdialogPicker:false

      }
      console.log(global.login);
     
  }


    render() {
        var data = {};
        if (  this.props.data  !=null)
        {
          data=  this.props.data ;
        }
        if (data.name==null){
          data.name = ""
        }
        if (this.state.sdt == null ) 
        {
          
            this.state.sdt =global.login.phone
        }
        return ( <Container style={styles.container}>
           <Content>
                    <Header style= {styles.header} androidStatusBarColor='#00aa8d' backgroundColor='#00aa8d'>

                            <Thumbnail
                                style={{backgroundColor: '#00aa8d', position: 'absolute', left: 10}}
                                source= {require("../../images/icon_docter.png")}
                            />
                            <Left>
                            <Body style={styles.bodyHeader}>
                              <View style={{ position:'absolute','left':-40 }} >
                                <Text style={{color: 'white',fontWeight: '600'}}>NHÂN VIÊN: {data.name.toUpperCase() } </Text>
                                <Text style={{color: 'white'}}>Thành tiền: {this.props.total} </Text>
                              </View>
                            </Body>
                            </Left>

                    </Header>

                    <View>
                        <Item  style={{padding:10,backgroundColor: 'white',flex: 1, }}>
                        
                            <Input   title = {"Số điện thoại"} onChangeText = {(text)=>{this.state.sdt=text}}  underline = {false}  defaultValue = {this.state.sdt} placeholder='Số điện thoại'  />
                        </Item>
                        <Item    style={{flexDirection:'row', paddingTop: 20, paddingHorizontal: 20}} >
                        <TouchableOpacity   style={{padding:10,backgroundColor: 'white',flex: 3/10,borderColor: 'grey', borderWidth: 1}} onPress = {()=>{

                            this.showImagePicker(true,'time')
                         }} > 
                            <Text     >{this.state.time}</Text>
                        </TouchableOpacity>
                            <Text> </Text>
                            <TouchableOpacity   style={{padding:10,backgroundColor: 'white',flex: 7/10,borderColor: 'grey', borderWidth: 1}} onPress = {()=>{

                                this.showImagePicker(true,'date')
                                }} > 
                            <Text     >{ this.state.date  } </Text>
                        </TouchableOpacity>
                        </Item>
                        <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 10}}>
                            <Button onPress={()=>{this.props.cancel()}}  style={{flex: 3/10, justifyContent: 'center', backgroundColor: '#5B5B5B'}}><Text>HUỶ</Text></Button>
                            <Text>   </Text>
                            <Button onPress={()=>{
                                // Toast.show({
                                //     text: 'Wrong password!',
                                //     buttonText: 'Okay'
                                // })
                                // return
                              if (this.props.onSubmit!=null) {
                                this.props.onSubmit(this.props.data.id,this.state.sdt,this.props.tam,this.props.vs,this.state.time+" "+this.state.date)
                                  
                              }
                            }

                            } style={{flex: 3/10, justifyContent: 'center', backgroundColor: '#00aa8d'}}><Text> ĐẶT LỊCH</Text></Button>
                        </View>

                             <DateTimePicker
                                date = {this.date}
                                mode = {this.state.dialogPickertype}
                                isVisible={this.state.isdialogPicker}
                                onConfirm={(date)=>this._handleDatePicked(date)}
                                onCancel={()=>this._hideDateTimePicker()}
                                />
                                </View>
                                </Content>
                </Container>

        )
      
    }
    showImagePicker(isShow,type)
    {
            this.state.dialogPickertype = type;
            this.setState({isdialogPicker:isShow});
    }
    _handleDatePicked(date){
       
        if ( this.state.dialogPickertype=='date'){
           this.state.date= ("0" + date.getDate() ).slice(-2)+"/"+("0" +date.getMonth()).slice(-2) +"/"+date.getFullYear() ;
           this.date = date;
        }else{
            this.state.time=  date.getHours()+":"+this.date.getMinutes()
           
        }
        
        console.log('A date has been picked: ', date);
        this.showImagePicker(false,'date');
    }
    _hideDateTimePicker(){
        this.showImagePicker(false,'date');
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
