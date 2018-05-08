import React, { Component } from 'react';
import {Animated,View, Text,StyleSheet,TouchableOpacity, Alert} from 'react-native';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
// import { Text,Container, Header,Thumbnail, Content, Card, CardItem,Item, Body,Input,Label, Left  } from 'native-base';
import {Container, Header,Body, Left,Right, Footer, Tab, Tabs ,ScrollableTab} from 'native-base';
import LoginHelper from "../util/LoginHelper"
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    MenuProvider  ,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import styles,{color} from "./styles"
interface Prop {
}
export default class DoctorActiveManager extends Component<Props> {

    onPressLogout()
    {

     this.props.onPressLogout();

    }
constructor(props)
{
    super(props);
    this.onPressLogout= this.onPressLogout.bind(this);
}
getTitle()
{
    return this.props.title
}
onPressOption()
{
    if (this.props.onPressOption!=null)
    this.props.onPressOption()
}
  render() {
    return (
        <MenuProvider {...this.props}>
      <Container  >

        <Header style={{}} backgroundColor={color.primary} androidStatusBarColor={color.primary}>
            <Body>
                <Text style={{fontSize: 20, justifyContent: 'flex-start', color: 'white'}}><Icon name='bell' size={20} />  Lịch đặt khám</Text>
            </Body>
            <Right>
                <Menu >
                <MenuTrigger>
                    <View style={{padding:10}}>
                    <Icon
                        name="ellipsis-v"
                        style={{color: 'white', justifyContent: 'center'}}
                        size={20}
                        />
                    </View>
                 </MenuTrigger>
                    <MenuOptions>
                        <MenuOption  style={{padding:10}} onSelect={() => this.onPressOption()} text='Thông tin' />
                        <MenuOption style={{padding:10}}onSelect={() => this.onPressLogout()} text='Thoát' />
                    </MenuOptions>
                    </Menu>
            </Right>
        </Header>

 
         <Tabs  style={{backgroundColor:color.primary}}  tabBarUnderlineStyle={{borderBottomColor: 'white'}} tabBgColor = {color.primary} renderTabBar={()=> <ScrollableTab />}>
         
         {this.props.listTable}
        </Tabs>
 
      </Container>
      </MenuProvider >
    )
  }
 
}
