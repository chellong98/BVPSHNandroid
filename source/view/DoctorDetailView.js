import React, { Component } from 'react';

import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import { Text, Toast,Container, Header, Content, Card, CardItem,Item, Body,Input,Button,Label, Footer , Root } from 'native-base';

import {View ,Dimensions, TouchableOpacity,Image,ScrollView,Animated } from 'react-native';

import CollapsingToolbar from './CollapsingToolbar'
import ServiceCard from './ServiceCard'
import styles, {color} from './styles';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import DialogConfirmBookingControl from "../control/DialogConfirmBookingControl";
import {ImageLink} from "../util/Common"
import LoadingView from "./LoadingView"
const deviceSize = Dimensions.get('window');
interface Prop {
}
const HEADER_EXPANDED_HEIGHT = 300
const HEADER_COLLAPSED_HEIGHT = 60

export default class DoctorDetailView extends Component <Prop>{


  constructor(props)
  {

      super(props);

      this.onClickRadioService = this.onClickRadioService.bind(this);
      this.state = {
        tam:0,
        vs:0,
        data:{},
        totalmoney:{},
        loading:true,
        showToast: false
      }
      this.slideAnimation = new SlideAnimation({
        slideFrom: 'bottom',
      });

     
  }
  onClickRadioService(index,value)
  {
      if (this.props.onChange!=null)
      {
        this.props.onChange(index,value)
      }
      this.forceUpdate();
      if (index==0 ){
        switch (value)
        {
          case 0:
             this.state.tam = 3
          break;

          case 1:
            this.state.tam = 4
          break;

          case 2:
            this.state.tam = 10
          break;
        }

      } else if (index==1 ){
        switch (value)
        {
          case 0:
             this.state.vs = 3
          break;

          case 1:
            this.state.vs = 4
          break;

          case 2:
            this.state.vs = 10
          break;
        }
      }
  }
  render() {
    var listItem = [];
    var listRender = [];
    if (this.props.services!= null)  listItem = this.props.services;

     for ( k in listItem)  {
       var data = listItem[k];

       listRender.push( ServiceCard(k , data.title,   data.content,this. onClickRadioService  ) );
     }
 
     var image = this.props.data.avartar;
 
     if (image == null)
     {
      image =  ImageLink.getDefaultAvatar();
     }
     else {
      console.log(image);
      image =  ImageLink.getFaceBookAvatar(image);
     }
     if (this.props.data!=null)
     {
      this.state.loading = false;
     }
     
 
      return (
        <Root>
        <Container style={{ backgroundColor:"white"}}>
          <LoadingView loading={this.state.loading} />
          <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation={this.slideAnimation}
          >
         <DialogConfirmBookingControl   navigation = {this.props.navigation} cancel = {()=>{ this.popupDialog.dismiss() }} data = {this.state.data} phone = {global.login.phone} tam = {this.state.tam} vs = {this.state.vs} />
          </PopupDialog>

         <CollapsingToolbar style={{flex: 6/10}} navigation = {this.props.navigation}  >

            <Content style={{padding:10,backgroundColor:"white"}}>
              <Card>
                <CardItem >
                  <View style={{height:45,paddingTop:8}}>
                    <Image  style = {{width:45,"height":45,"position":"absolute"}} source ={image} ></Image>
                    <View style= {{ paddingLeft:50}} >
                      <Text style={styles.titleCardName}>  {this.props.data.name} </Text>
                      <Text style={styles.infoCard} >  {this.props.data.hospital}  </Text>
                    </View>
                  </View>
              </CardItem>
            </Card>
              {listRender}

            </Content>

           </CollapsingToolbar>
          
            <Button full success 
              style={{backgroundColor: color.primary, width: deviceSize.width, position: 'absolute', bottom: 0}}
              
              onPress  = { ()=>{
              
                data = this.props.data;
                this.setState({data} )
                this.popupDialog.show() 
              
              }}
            >
            
                <Text> </Text>
            </Button>
          
      </Container>
      </Root>

      )
  }

}
