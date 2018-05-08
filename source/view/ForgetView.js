
import React, { Component } from 'react';
 
import {color} from "./styles"
import {Animated,View, AppRegistry, StatusBar,Image ,BackHandler,TextInput,TouchableOpacity,Alert  } from "react-native";
import { Container, Header, Content, Card, CardItem,Item, Body,Input,Button,Label ,Icon,Text} from 'native-base';
import { NavigationActions } from 'react-navigation';
import ButtonLoading from 'rn-gn-buttonloading'
type Props = {};
export default class ForgetPaswordView extends Component<Props> {

  constructor(props) {
   super(props);
    this.state = {
      account :"",
      password:"",
      password2:"",
      showPassword:0,
      viewSpring: new Animated.Value(0.0),
      viewSpring2: new Animated.Value(0.0),
    }
  }

  componentDidMount() {
    StatusBar.setHidden(false);
    StatusBar.setBackgroundColor(color.primary);
    StatusBar.setBarStyle('light-content', true);
    
 }
  render() {
  
    Animated.spring(this.state.viewSpring, {
      toValue: 1.0,
      delay:200,
    }).start();
    Animated.spring(this.state.viewSpring2, {
      toValue: 1.0,
      delay:200,
    }).start();

        return<Container>

          <Header style={{}} backgroundColor={color.primary} androidStatusBarColor={color.primary}>
            <TouchableOpacity    style={{position:'absolute',left:10,top:20,height:80,width:80 }} onPress={ () => {this.props.navigation.dispatch(NavigationActions.back())} } >
              <Icon name='arrow-back' style={{fontSize: 30, color: 'white'}} />
            
            </TouchableOpacity>
          
              <Text style={{color:'white',paddingTop:10}} >Quên  mật khẩu</Text>
         
        </Header>
        <Content  >
        
          {this.viewsubmitgmail()}
          {this.viewSubmitcode()}
         
        </Content>
        <View style={{width:'100%',marginTop:20,position: 'absolute',
  bottom: 0}}>
                      <ButtonLoading
                      /*'#1ab57c' */
                      loadingColor = {"white"} 
                      background = {{ backgroundColor: color.primary}}  
                      textstyle = {{color:'white',fontSize:16}}  
                    
                      onPress={()=>{
                      
                        
                      this.evenSubmit();
                      }}

                      ref={(btn)=>{
                      this.button = btn;  
                      }} 
                          borderRadius={1}
                          size= {45} style= {{color:'white'}} title="Tiếp tục" 
                      
                         />
                 
                   
                </View>
      </Container>
    

  }
  viewsubmitgmail()
  {
    if (this.props.step!=1) return;
   
    return  <Animated.View style={{transform:[{scaleX:this.state.viewSpring}]}}><Card   style={{margin:10,marginTop:60}}>

    <CardItem >
      <Body style={{paddingTop:20}}>

        <Item floatingLabel  >
             <Label style={{color:color.primary}}>Nhập email của bạn để tiếp tục</Label>
             <Input  editable = {  (this.props.step!=1)?(false):(true)  }    underline={false}  onChangeText = {(text)=>{this.state.account=text}} />
        </Item>
      
        <View style={{width:'100%',marginTop:10,textAlign:'right' }}>
           
        </View>
        
      </Body>
    </CardItem>
    
  </Card>
  </Animated.View>
  }
  showNote()
  {
      return   <Card   style={{marginTop:10}}>


      <CardItem >
        <Body>
          <Text>Chúng tôi đã gửi mail chứa mã xác nhận khôi phục mật khẩu đến email của bạn. Chọn gửi lại nếu sau 5 phút không nhận được email nào</Text>
        </Body>
        
      </CardItem>
      <CardItem>
      <ButtonLoading
      /*'#1ab57c' */
      loadingColor = {"white"} 
      background = {{ backgroundColor: '#f49542'}}  
      textstyle = {{color:'white',fontSize:16}}  
    
      onPress={()=>{
        this.evenResend();
      }}

      ref={(btn)=>{
      this.button2 = btn;  
      }} 
          borderRadius={1}
          size= {45} style= {{color:'white'}} title="Gửi lại" 
      
         />
 
      </CardItem>
    
    </Card>
  }
  viewSubmitcode(){
    if (this.props.step!=2) return;
    
    return (
      <Animated.View style={{transform:[{scaleX:this.state.viewSpring}]}}>
      <View>
      {this. showNote()}
    
      <Card   >
      <CardItem >
        <Body style={{paddingTop:10}}>
 
          <Item floatingLabel  >
               <Label style={{color:color.primary}}>Nhập mã xác nhận</Label>
               <Input underline={false}  onChangeText = {(text)=>{
                 this.state.code=text
                 if (this.state.code===this.props.accountCode){
                  this.state.viewSpring2= new Animated.Value(0.0)
                   this.setState({showPassword:1})
                 }else {
                   if (this.state.showPassword==1)
                   {
                    this.setState({showPassword:0})
                   }
                 }
                
                }} />
          </Item>
        
          <View style={{width:'100%',marginTop:10,textAlign:'right' }}>
             
          </View>
          
        </Body>
      </CardItem>
                {this.showPasswordChangeLayout()}
    </Card>
      </View>
      </Animated.View>
    )
  }
  showPasswordChangeLayout()
  {
    if (this.state.showPassword==0) return;
    return   <Animated.View style={{transform:[{scaleY:this.state.viewSpring2}]}}>


   
    <CardItem  style={{ justifyContent:"center"}}>
    <CardItem >
    <Image style = {{width:100,height:100}}source ={require("../../images/lockicon.png")}/> 
    </CardItem >
    <Body  >
           
          <Item floatingLabel  >
               <Label style={{color:color.primary}}>Nhập mật khẩu mới</Label>
               <Input underline={false}    secureTextEntry={true} onChangeText = {(text)=>{
                 this.state.password=text
                 
                
                }} />
          </Item>
          <Item floatingLabel  >
               <Label style={{color:color.primary}}>Xác nhận mật khẩu mới</Label>
               <Input underline={false}   secureTextEntry={true}  onChangeText = {(text)=>{
                 this.state.password2=text
                 
                
                }} />
          </Item>
          

        
          <View style={{width:'100%',marginTop:10,textAlign:'right' }}>
             
          </View>
          
        </Body>
      </CardItem>
    </Animated.View>
  }
  evenSubmit()
  {
    var str =this.state.account;
    if (this.props.step==1)
    {
     if (this.props.onSubmit!=null)   this.props.onSubmit(str) ;
    }
    else {
      if (this.state.showPassword==1)
      {
        if (this.props.onChangePassword!=null)   this.props.onChangePassword(this.state.password,this.state.password2) ;
      }else{
          Alert.alert("Noop!");
          setTimeout(()=>{
            this.button.cancel();
      
          },1000)
      }
    }

  }
  evenResend()
  {
    setTimeout(()=>{
      this.button2.cancel();

    },5000)
    if (this.props.evenResend!=null)
    {
      this.props.evenResend(this.state.account)
    }
  }
  alertError(error)
  {
    Alert.alert(error)
    this.button.cancel();
  }
  nextStep()
  {
    this.state.viewSpring= new Animated.Value(0.0),
    this.button.cancel();
  }

  componentWillUnmount() {
   
  }
 
}
