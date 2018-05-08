import { Text,Container, Header, Content, Card, CardItem,Item,Input, Body,Button,Label  } from 'native-base';
import React, { Component } from 'react';
import {Dimensions,Image,View ,TouchableOpacity,TextInputa  } from 'react-native';
import {color} from './styles'
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import FBLoginView  from "./FBLoginView"
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import ButtonLoading from 'rn-gn-buttonloading'
 
var module ={
    render:render,
    onClickLogin:null,
    onClickRegister:null,
    evenClickLogin:onClickLogin,
    evenClickRegister:onClickRegister,
    onLoginFacebook:onLoginFacebook,
    evenLoginFacebook:null,
    cancelLogin:cancelLogin,
    account:"",
    password:"",
}
function cancelLogin()
{
    this.button.cancel()
}
function render()
{
    return (<Container>
  
        <Content style={{}}>
 
          <Card   style={{margin:10,marginTop:60}}>

            <CardItem>
              <Body style={{paddingTop:20}}>
                  
                <Item floatingLabel  >
                     <Label style={{color:color.primary}}>Tài khoản</Label>
                     <Input underline={false}  onChangeText = {(text)=>{module.account=text}} />
                </Item>
                <Item floatingLabel  style={{marginTop:20}} >
                     <Label style= {{color:color.primary}}> Mật khẩu</Label>
                     <Input underline={false}  onChangeText = {(text)=>{module.password=text}}  secureTextEntry={true} />
                </Item>
                <View style={{width:'100%',marginTop:10,textAlign:'right' }}>
                    <TouchableOpacity style={{padding:20,alignItems: 'flex-end' }} onPress = {()=>{ if (module.onForget != null) module.onForget();}}>
                      <Text  style={{color:'#41f498'}}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                     
                        <ButtonLoading  
                                loadingColor = {"white"} 
                                background = {{ backgroundColor:'#1ab57c' }}  
                                textstyle = {{color:'white',fontSize:16}}  
                            
                                onPress={()=>{
                                
                              
                                module.evenClickLogin();
                                }}
        
                                ref={(btn)=>{
                                this.button = btn;  
                                }} 
                                    borderRadius={1}
                                    size= {50} style= {{color:'white'}} title="Đăng Nhập" />
                        <Button full light onPress={module.onClickRegister}  >
                            <Text>Đăng ký</Text>
                        </Button>
                </View>
                
              </Body>
            </CardItem>
          </Card>
          <View style={{flex:1,flexDirection:"row"}}>
          <View style={{flex:0.5,backgroundColor:"gray",height:2,marginTop:10}}></View>
          <Text style={{paddingHorizontal:10}}>Hoặc</Text>
          <View style={{flex:0.5,backgroundColor:"gray",height:2,marginTop:10}}></View>
          </View>
          <Card>
              
            <CardItem  style={{felx:1,flexDirection:"column"}}  >
    
                <FBLogin 
            buttonView={<FBLoginView />}
            ref={(fbLogin) => { this.fbLogin = fbLogin }}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            permissions={["email","public_profile"]}
            onLogin={function(e){ module.onLoginFacebook(e) }}
            onLoginFound={function(e){  FBLoginManager.logout((data) => {
             })}}
            onLoginNotFound={function(e){console.log(e)}}
            onLogout={function(e){console.log(e)}}
            onCancel={function(e){console.log(e)}}
            onPermissionsMissing={function(e){console.log(e)}}
          />
         
            </CardItem>
          </Card>
        </Content>
      </Container>)
}
function onLoginFacebook(ev)
{
  
    credentials = ev.credentials
    if (credentials==null) return
    var token = credentials.token;
    var userId = credentials.userId;

    if  (module.evenLoginFacebook!=null) 
    {
        module.evenLoginFacebook({token:token,userId:userId})
       
    }

}
function onClickLogin()
{
    if (module.onClickLogin != null) module.onClickLogin();
}
function onClickRegister()
{
    if (module.onClickRegister != null) module.onClickRegister();
}

export default module
