import { Text,Container, Header, Content, Card, CardItem,Item, Body,Button,Label,Right, Radio,List,ListItem,Form } from 'native-base';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {View,TouchableOpacity,TextInput,ScrollView
  } from 'react-native';
  import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
  import Lang from '../util/Language';
  import {color} from "./styles"
  import {Icon} from 'native-base';
   
import Input from "./Input"
Lang.form="Register"
var module ={
    parent:null,
    render:render,

    onClickRegister:null,
    evenClickRadioGender:radioGenderCLick,
    evenClickRadioUsertype:radioUsertypeCLick,
    evenClickRegister:onClickRegister,
    account:"",
    password:"",password2:"",
    address:"",
    phonenumber:"",
    name:"",
    gender:0,
    usertype:0,
    navigation:null,
    gender_db:[
    {label: Lang.get("textGemder_M"), value: 0 , selected:true},
    {label: Lang.get("texGender_F"), value: 1 , selected:false}
    ],
    usertype_db:[
    {label:  Lang.get("texDoctor"), value: 0 , selected:true},
    {label:  Lang.get("texCustomer"), value: 1 , selected:false}
  ],
}
function render()
{
  var oldSetting = global.setting;
  if (oldSetting==null)
  {
    oldSetting ={}
    oldSetting.ADDRESS_DOCTER_DEFAULT = ""
  }
    return (<Container style={{backgroundColor:"white"}}>

        <Content >
        <Header style={{}} backgroundColor={color.primary} androidStatusBarColor={color.primary}>
        <TouchableOpacity    style={{position:'absolute',left:10,top:20 }} onPress={ () => {module.navigation.dispatch(NavigationActions.back())} } >
          <Icon name='arrow-back' style={{fontSize: 30, color: 'white'}} />
        
      </TouchableOpacity>
      <Right>
                 <TouchableOpacity full success onPress={module.evenClickRegister}  >
                          <Text style= {{color:"#ffffff"}}>Đăng Ký</Text>
                </TouchableOpacity>
          </Right>
        </Header>

                <Content  style={{margin:5}}>
                <Form>
                <Item   underline={false}   >
                  <Input  style={{flex:1}} underline={false}  title = {Lang.get("hinAccount")} onChangeText = {(text)=>{module.account=text}}   />
                </Item>
               
                <Item   underline={false} >
                      
                     <Input title= {Lang.get("hinUserName")}  underline={false}  onChangeText = {(text)=>{module.name=text}}  />
                </Item>
                <Item inlineLabel underline={false}  style={{marginTop:5}} >
                     
                     <Input  title = {Lang.get("hinPassword")} onChangeText = {(text)=>{module.password=text}}  secureTextEntry={true} />
                </Item>
                <Item inlineLabel underline={false}  style={{marginTop:5}} >
                      
                     <Input title={Lang.get("hinPassword2")}  onChangeText = {(text)=>{module.password2=text}}  secureTextEntry={true} />
                </Item>
                <Item inlineLabel underline={false} >
                   
                     <Input title = {Lang.get("hinPhone")}   onChangeText = {(text)=>{module.phonenumber=text}} style={{marginTop:5}} />
                </Item>
                <Item inlineLabel    underline={false} >
                     
                     <Input title ={Lang.get("hinAddress")} underline={false}  defaultValue = {oldSetting.ADDRESS_DOCTER_DEFAULT} onChangeText = {(text)=>{module.address=text}} style={{marginTop:5}} />
                </Item>
               
                  <Content padder >
                <List>

                  <RadioForm

                    formHorizontal={true}
                    labelHorizontal={false}
                    buttonColor={'#2196f3'}
                    animation={true}

                  >

                      {module.gender_db.map((obj, i) => {

                        return ( <View  >
                          <RadioButton labelHorizontal={true} key={i} >

                            <RadioButtonInput
                              obj={obj}
                              index={i}
                              isSelected={obj.selected}
                              onPress = {module.evenClickRadioGender}
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
                                onPress = {module.evenClickRadioGender}
                              labelStyle={{fontSize: 14, color: (obj.selected)?'#2ecc71':'#888'}}
                              labelWrapStyle={{}}
                            />
                            </RadioButton>
                          </View>)

                      })}
                  </RadioForm>
                  <RadioForm
                    formHorizontal={true}
                    labelHorizontal={false}
                    buttonColor={'#2196f3'}
                    animation={true}
                      onPress={(value) => {console.log(value)}}
                  >

                      {module.usertype_db.map((obj, i) => {

                        return ( <View  >
                          <RadioButton labelHorizontal={true} key={i} >

                            <RadioButtonInput
                              obj={obj}
                              index={i}
                              isSelected={obj.selected}
                              onPress = {module.evenClickRadioUsertype}
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
                                onPress = {module.evenClickRadioUsertype}
                              labelStyle={{fontSize: 14, color: (obj.selected)?'#2ecc71':'#888'}}
                              labelWrapStyle={{}}
                            />
                            </RadioButton>
                          </View>)

                      })}
                  </RadioForm>
                </List>
              
              </Content>
              </Form>
              </Content>
                <View style={{width:'100%',marginTop:0}}>
                      <Button full success onPress={module.evenClickRegister}  >
                          <Text>Đăng Ký</Text>
                      </Button>
                </View>
        </Content>
      </Container>)
}
function radioGenderCLick(value)
{

  module.gender = value
  module.gender_db[value].selected = true;
  module.gender_db[1-value].selected = false;
    module.parent.forceUpdate();
}
function radioUsertypeCLick(value)
{

  module.usertype = value
  module.usertype_db[value].selected = true;
  module.usertype_db[1-value].selected = false;
    module.parent.forceUpdate();
}

function onClickRegister()
{
    if (module.onClickRegister != null) module.onClickRegister();
}
export default module
