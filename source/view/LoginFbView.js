import React, { Component } from 'react';
import {Animated,ScrollView,View,StatusBar ,StyleSheet,TouchableOpacity, Alert,Image} from 'react-native';
 // import { Text,Container, Header,Thumbnail, Content, Card, CardItem,Item, Body,Input,Label, Left  } from 'native-base';
import {Button,Container, Header,Body, Left,Right,Content,Text} from 'native-base';
import LoginHelper from "../util/LoginHelper"
import Icon from 'react-native-vector-icons/FontAwesome';
import styles,{color} from "./styles"
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import FBLoginView  from "./FBLoginView"
import LoadingView  from "./LoadingView"

interface Prop {
}
export default class LoginFBView extends Component<Props> {

  
constructor(props)
{
    super(props);
    this.state={
      loading:false,
    }
  
}
componentDidMount() {
    StatusBar.setHidden(true);
 }
 
  onLogin(e)
  {

  }
  render() {
    const resizeMode = 'center';
    this.state.loading = this.props.loading  ;
    return (
     
      <Container style={{backgroundColor:color.primary,paddingTop:30}}  >
         <LoadingView loading={this.state.loading} />
        <Image 
        style={{
            width: '100%',
            justifyContent: 'center',
            flex: 1,
           
          }}
        
        source ={require('../../images/img_loadding.png')}  >

        </Image>
        <Content>
  
          <View style={{padding:20,
          flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',}}>
          
          
          <Button  full success onPress={()=>{
               this.props.navigation.navigate("Login")
            }}>
              <Text> Đăng nhập</Text>
            </Button>
            <View style={{padding:20}}>
            <FBLogin
          
            buttonView={<FBLoginView />}
            ref={(fbLogin) => { this.fbLogin = fbLogin }}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            permissions={["email","public_profile"]}
            onLogin={(e)=>{ this.onLoginFacebook(e)} }
            onLoginFound={function(e){  FBLoginManager.logout((data) => {
            })}}
            onLoginNotFound={function(e){console.log(e)}}
            onLogout={function(e){console.log(e)}}
            onCancel={function(e){console.log(e)}}
            onPermissionsMissing={function(e){console.log(e)}}
          />
          </View>
          </View>
        </Content>
      </Container>
    )
  }
 
  onLoginFacebook(ev)
{
  
    credentials = ev.credentials
    if (credentials==null) return
    var token = credentials.token;
    var userId = credentials.userId;

    if  (this.props.onLoginFacebook!=null) 
    {
      this.props.onLoginFacebook({token:token,userId:userId})
       

    }

}
 
}
