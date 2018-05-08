import React,{Component} from "react";

import {View, AppRegistry, StatusBar,Image,Share } from "react-native";
import { Container, Content, Text, List, ListItem ,Left,Body,Icon} from "native-base";
import LoginHelper from "../util/LoginHelper"
 
import style,{color} from "../view/styles"
import {ImageLink} from "../util/Common"
import {  Config, Log , CMD,USER} from "../util/Config"
export default class CustomDrawerNav extends React.Component {
  static navigationOptions = {
  header: null,
  drawerLabel: () => null
  };
  constructor(props){
    super(props);

  }
    render() {
    //  "https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/28058389_829313610582420_8717187890646265831_n.jpg?oh=158a3f6dcb19def9007991404280e689&oe=5B3810A8"
    if (this.props.user==null)
    {
      this.props.user={
          full_name:"Noname",
          distric:"Noname"
      }

    }
    var image  = this.props.user.image;
    if (image==null)
    {
      image= ( this.props.user.user_type==USER.CUSTOMER) ?ImageLink.getUserDefaultAvatar():ImageLink.getDefaultAvatar()

    }
    else {
      image= ImageLink.getFaceBookAvatar(image);

    }
      return (<Container>
        <Content>
       <View style={{backgroundColor:color.primary,padding:20,flexDirection: 'row'}}>
         <Image
                   square
                   style={ { borderRadius: 30, width: 60, height: 60,  marginTop:10} }
                   source={image}
                 />
        <View>
       <Text style = {{color:'white',paddingTop:16,paddingLeft:10}}>{this.props.user.full_name}</Text>
       <Text style = {{color:'#dddddd',paddingTop:2,paddingLeft:10,fontSize:12}}>{this.props.user.username}</Text>
       </View>
       </View>
            <List
          dataArray={this.props.routes}
          renderRow={data => {
            return (
              <ListItem icon
                button
                onPress={() => {
                  if (data.type==0)
                    this.props.navigation.navigate(data.cmd)
                  if (data.type==-1)
                  {
                       LoginHelper.logout(this.props.navigation.navigate,"Login")
                  }
                  if (data.type==-2)
                  {
                    Share.share({
                      message: 'Bệnh viện phụ sản Hà Nội KmavnTeam@chienthang',
                      url: 'http://bvpshn.tk',
                      title: 'Bệnh viện phụ sản Hà Nội apps'
                    }, {
                      // Android only:
                      dialogTitle: 'Bệnh viện phụ sản Hà Nội',
                      // iOS only:
                      excludedActivityTypes: [
                        'com.apple.UIKit.activity.PostToTwitter'
                      ]
                    })
                  }
                }
                }> 
                  <Left>
                  <Icon ios={data.ios} android={data.md} style={{fontSize: 30, color: 'black'}}/> 
                  </Left>
                  <Body>
                   <Text>{data.title}</Text>
                   </Body>
                  
              </ListItem>
            );
          }}
        />
        </Content>
      </Container>
    )
  }
}
