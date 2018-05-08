import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body,Input,Item,Form,Button} from 'native-base';


type Props = {};
export default class Login extends Component<Props> {
  static navigationOptions = {
  header: null,
  };
  constructor(props) {
   super(props);
   this.state = {
        account: "",
        password:"",
        displayPassword:"",
      };
  this.loginEvent = this.loginEvent.bind(this);
 }
 loginEvent()
 {
alert("click");
 }
 RegisterEvent()
 {
alert("click");
 }
  render() {
      return (
        <Container>
          <Header />
          <Content>
            <Card>
              <CardItem>
                <Body>
                <Item>
                 <Input underline={false}  onChangeText={(account) => {this.setState({account}); }} value={this.state.account} placeholder="Tên đăng nhập" />
                 </Item>
                 <Item>
                 <Input underline={false}  onChangeText={(password) => {this.setState({password});  }}   placeholder="Mật khẩu" value={this.state.password}  secureTextEntry={ true} />
                 </Item>
                 <Button full success onPress={this.loginEvent} >
                 <Text>ĐĂNG NHẬP</Text>
                 </Button>
                 <Button full light onPress={this.RegisterEvent}>
                 <Text >ĐĂNG KÝ</Text>
                 </Button>
                </Body>
              </CardItem>
           </Card>
          </Content>
        </Container>
   );

  }
}
