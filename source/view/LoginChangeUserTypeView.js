import React, { Component } from 'react';
import {Animated,ScrollView,View,StatusBar ,StyleSheet,TouchableOpacity, Alert,Image} from 'react-native';
 import {Button, Text,Container, Header,Thumbnail, Content, Card, CardItem,Item, Body,Input,Label, Left  } from 'native-base';
 import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import LoginHelper from "../util/LoginHelper"
import Icon from 'react-native-vector-icons/FontAwesome';
import styles,{color} from "./styles"
import Lang from '../util/Language';
import {ImageLink} from "../util/Common"
Lang.form="Register"
interface Prop {
}
export default class LoginChangeUserTypeView extends Component<Props> {

  
constructor(props)
{
    super(props);
    this.usertype_db=[
      {label:  Lang.get("texDoctor"), value: 0 , selected:true},
      {label:  Lang.get("texCustomer"), value: 1 , selected:false}
    ]
    this.state={
      valueUserType :0,
    }
}
componentDidMount() {
    StatusBar.setHidden(true);
 }
 
  render() {
    console.log(this.props.data);
    var username = (this.props.data!=null)?this.props.data.username:"";
    var userId = username.substr(0,username.indexOf("@"));
    var full_name = (this.props.data!=null)?this.props.data.full_name:"";
    var  image= ImageLink.getFaceBookAvatar(userId);

    const resizeMode = 'center';
    return (
        
      <Container style={{backgroundColor:color.primary,paddingTop:100}}  >
 
        <Content>

          <View style={{padding:20}}>
          <View  style={{margin:5}}>
          <View  style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
          <Image
                  
                   style={ { fkex:1,borderRadius: 30, width: 160, height: 160,  marginTop:10} }
                   source={image}
                 />
                 </View>
          <View style={{padding:5}}>
          <Text style={styles.TextMod} >{Lang.get("hinAccount") +":"}</Text>
          <Text style={[styles.TextMod,{ fontWeight:"bold"}]}  >{username}</Text>
          </View>
          <View style={{padding:5}}>
          <Text style={styles.TextMod} >{Lang.get("hinUserName") +":" } </Text>
          <Text style={[styles.TextMod,{ fontWeight:"bold"}]} >{full_name}</Text>
                {this.showViewType()}
          </View>
            
        </View>
       
          </View>
          
        </Content>
        <Button   style = {{position:'absolute', bottom:2,width:'100%'}} full success onPress={()=>{
               this.onPressContinue( this.state.valueUserType );
            }}>
              <Text>Tiếp Tục</Text>
            </Button>
      </Container>
    )
  }
  showViewType()
  {
    if ( this.props.data.user_type==0)
    return(
    <View style={{paddingTop:15}}>

    <Text style={[styles.TextMod,{fontSize:20,padding:10}]} >Bạn là bệnh nhân hay bác sĩ? </Text>
   <RadioForm
             formHorizontal={true}
             labelHorizontal={false}
             buttonColor={'white'}
             animation={true}
               onPress={(value) => {console.log(value)}}
           >

               {this.usertype_db.map((obj, i) => {

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
                       buttonInnerColor={'white'}
                       buttonOuterColor= { 'white'  }
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
                       labelStyle={{fontSize: 14, color: 'white'}}
                       labelWrapStyle={{}}
                     />
                     </RadioButton>
                   </View>)

               })}
           </RadioForm>
           </View>)
  }
  onSelectedRadio(value)
  {
   
    this.usertype_db[1-value].selected = false;
    this.usertype_db[value].selected = true;
    this.forceUpdate();
    this.state.valueUserType = 2-value;

  }
  onPressContinue(value)
  {
      if (this.props.pressContinue!=null)  this.props.pressContinue(value);
  }

 
}
