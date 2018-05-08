import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Alert,Linking,Image} from 'react-native';
import {Button,Item,Label,Container, Header, Body, Left, Icon, List, ListItem,Content,Thumbnail, Right,Text} from 'native-base';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { NavigationActions } from 'react-navigation';
import ManageListCustom from "./ManageListCustom"
import RNGooglePlaces from 'react-native-google-places';
import {USER} from "../util/Config"
import {color} from "./styles"
import {ImageLink} from "../util/Common"
import Input from "./Input"
export interface Props {
    navigation: any,
    data: any,
}
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
var ImagePicker = require('react-native-image-picker');
export interface State {}
var options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
export default class OptionView extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.user_gender= [
            {label:"Nam", value: 0 , selected:true},
            {label:"Nữ", value: 1 , selected:false}
            ]
            
        this.state = {
            full_name:"",
            date:"",
            infor:"",
            phone:"",
            address:"",
            locate:{longitude:0,latitude:0},
            gender:0,
            msisdn:"",
            hospital:"",
            percenterUploading:"0",
            isUpload:false

        }
   
  //  Communications.phonecall('01252120219', true)
    }

    
 
  render() {
    var data = this.props.data;
    console.log(data)
    if (data.isLoad)
    {
        this.state.full_name = (data.full_name!=null)? data.full_name: data.name
        this.state.avartar = data.avartar||global.login.avartar
        this.state.date = data.dob
        this.state.infor = data.info_p
        this.state.phone = data.phone||global.login.phone
        this.state.hospital = data.hospital
        this.state.locate = {longitude:data.longitude,latitude:data.latitude}
        data.isLoad = false;
        this.state.address = data.address
        this.state.gender = data.sex_id
        
        if (data.sex_id==null) data.sex_id= 0;
            this.user_gender[1-data.sex_id].selected = true;
            this.user_gender[data.sex_id].selected = false;

    }

    var image = this.state.avartar;
 
    if (image == null)
    {
         image=   (global.login.user_type!=USER.DOCTER   )?ImageLink.getUserDefaultAvatar():ImageLink.getDefaultAvatar()
    }
    else {
        
         image =  ImageLink.getFaceBookAvatar(image);
    }
    if (this.props.data!=null)
    {
     this.state.loading = false;
    }
 
    return (
        <Container style={{backgroundColor:"white"}}>

        <Content >
        <Header style={{height:200}} backgroundColor={color.primary} androidStatusBarColor={color.primary}>
       
      <View   underline={false} style={{  flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',}} >
                 <View style={{flex:1,flexDirection:"column",padding:10,paddingTop:30}}>
                     {  this._doctorAvartar(image) }
                    
                     </View>
                     <View style={{flex:1,paddingTop:20, flexDirection: 'row',}}>
                     <Input    onChangeText = {(text)=>{this.state.full_name=text}} style={{textAlign:'center',flex:1,color:'white',width:'100%'}}  defaultValue = {this.state.full_name}/>
                     </View>
          </View>
        <TouchableOpacity    style={{position:'absolute',left:10,top:20  }} onPress={ () => {this.props.navigation.dispatch(NavigationActions.back())} } >
          <Icon name='arrow-back' style={{fontSize: 30, color: 'white'}} />
      </TouchableOpacity>
        </Header>
               
              
                <View  style={{margin:5}}>
                
                <Item>
                <Content padder >
                <List>
                <RadioForm
                    formHorizontal={true}
                    labelHorizontal={false}
                    buttonColor={'white'}
                    animation={true}
                      onPress={(value) => { this.onClickUpdate() }}
                  >

                      {this.user_gender.map((obj, i) => {
                           
                        return ( <View  >
                          <RadioButton labelHorizontal={true} key={i} >

                            <RadioButtonInput
                              obj={obj}
                              index={i}
                              isSelected={obj.selected}
                              onPress = {()=>{
                                this.onSelectedRadio(i)
                              }}
                              borderWidth={1}
                              buttonInnerColor={'#2196f3'}
                              buttonOuterColor= { (obj.selected)?'#2196f3':"#888"  }
                              buttonSize={10}
                              buttonOuterSize={15 }
                              buttonStyle={{}}
                              buttonWrapStyle={{marginLeft: 10}}
                            />
                            <RadioButtonLabel
                              obj={obj}
                              index={i}
                              labelHorizontal={true}
                              onPress = {()=>{

                                this.onSelectedRadio(i)

                              }}
                              labelStyle={{fontSize: 14, color: (obj.selected)?'#2ecc71':'#888'}}
                            
                            />
                            </RadioButton>
                          </View>)

                      })}
                  </RadioForm>
                  </List>
                  </Content>
                    </Item>
                <Item   underline={false} >
                     
                     <Input title="Ngày sinh" underline={false}  onChangeText = {(text)=>{this.state.date=text}}  defaultValue = {this.state.date} />
                </Item>
                <Item   underline={false}  style={{marginTop:5}} >
                     
                     <Input title={"Thông tin mô tả"} onChangeText = {(text)=>{this.state.infor=text}}  defaultValue = {this.state.infor}  />
                </Item>

                {
                    this._doctor()
                }

                <Item   underline={false} >
                      
                     <Input title ={"Điện thoại"} underline={false}  onChangeText = {(text)=>{this.state.phone=text}}   defaultValue = {this.state.phone} />
                </Item>
                <Item   underline={false} >
                      
                     <Input title= {"Địa chỉ"} underline={false}   onChangeText = {(text)=>{this.state.address=text}}    defaultValue = {this.state.address} />
                </Item>
                <Item style={{paddingVertical:14}} >
                     <Label>Vị trí</Label>
                     <TouchableOpacity onPress={()=>{

RNGooglePlaces.openPlacePickerModal({
    type: 'establishment',
    country: 'VN',
 
    radius: 10
})
.then((place) => {
     
    var locate = {latitude:place.latitude,longitude:place.longitude}
    this.setState({locate})
 
}) .catch(error => console.log(error.message));   

                     }}>
                     <Text >{this.state.locate.longitude.toFixed(4)},{this.state.locate.latitude.toFixed(4)}</Text>
                     </TouchableOpacity>
                </Item>
              </View>
                <View style={{width:'100%',marginTop:0}}>
                      <Button full success onPress={()=>{ this.onClickUpdate() }}  >
                          <Text>CẬP NHẬP THÔNG TIN</Text>
                      </Button>
                </View>
        </Content>
      </Container>
    )
  }  
  onSelectedRadio(value)
  {
   
    this.user_gender[1-value].selected = false;
    this.user_gender[value].selected = true;
    this.forceUpdate();
    this.state.gender = 1-value;

  }
  onClickUpdate(){
    if (this.props.onPressUpdate!=null)
    {
        var data =  this.state;
        this.props.onPressUpdate(data);
    }

  }

uploadPhoto(image,filename){
    this.state.isUpload = true;
    request = new ServerRequest(Package.uploadImage(image,filename));
    request.setOnProgress((event)=>{
   
     percenterUploading = Math.floor(  event.loaded / event.total * 100)+"%";
     this.setState({percenterUploading});
    })
    request.setOnCompleted((cmd,json)=>{
        json = json.replace(/\"/g,"");
        this.state.avartar = json;
        isUpload = false;
       
        request2 = new ServerRequest(Package.updateAvatar(global.login.id,json));
 
        request2.setOnCompleted((cmd,json)=>{

            this.setState({isUpload})
        })
        request2.execute()

    })
    request.uploadImage();
     
  }
  upLoadImage(){
      if (global.login.user_type!=USER.DOCTER ) console.log('login'); console.log(global.login.user_type); return
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
          this.uploadPhoto(response.uri,response.fileName||"random.jpg")
          
          this.setState({
            imageView : source
          });
        }
      });
  }
  __percenter()
  { 
      if (this.state.isUpload)
        return <Text style={{transform:[{translateY:-60}], borderRadius:10 ,backgroundColor:"rgba(0,0,0,0.5)",width:107,textAlign:'center',color:'white'}}>{this.state.percenterUploading}</Text>;
  }
  _doctorAvartar(image)
  {
   
      return (
            <TouchableOpacity onPress={()=>{

                    this.upLoadImage();
            }}>
           
                <Image style={{width:110,height:110,borderRadius:55, borderColor:'white',borderWidth:2 }} source={image}/>
                {this.__percenter()}
            
            </TouchableOpacity>
            )
  }
  _doctor()
{
    if (global.login.user_type==USER.DOCTER   )
    return ( <View>
        <Item   underline={false} >
       
        <Input  title = {"Nơi công tác"} underline={false}  defaultValue ={this.state.hospital} onChangeText = {(text)=>{this.state.hospital=text}} style={{marginTop:5}} />
   </Item>
   <Item   underline={false}  style={{marginTop:5}} >
       
        <Input title={"Mã số NV"}  defaultValue = {this.state.msisdn} onChangeText = {(text)=>{this.state.msisdn=text}}   />
   </Item> 
    </View>)
}
};
 