import React, { Component } from 'react';

import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import { Text,Container, Header, Content, Card, CardItem,Item, Body,Input,Button,Label  } from 'native-base';
import {View ,TouchableOpacity,Image,Animated ,ListView,ScrollView,Dimensions} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {Icon } from 'native-base';
interface Prop {

}
export default class CollapsingToolbar extends Component <Prop>{


  constructor(props)
  {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    }
  }
  render() {
    const screenHeight = Dimensions.get('window').height
    const headerHeight = this.state.scrollY.interpolate({
    inputRange: [0, this.props.height-60],
    outputRange: [this.props.height, 60],
    extrapolate: 'clamp'
    })
    
      return (<View>
        <Animated.View  style={{height: headerHeight}}>
                <Image  style = {{width:"100%","height":"100%"}} source ={require('../../images/img_loadding.png')}></Image>
      </Animated.View>
      <TouchableOpacity    style={{position:'absolute',left:10,top:20 }} onPress={ () => {this.props.navigation.dispatch(NavigationActions.back())} } >
      <Icon name='arrow-back' style={{fontSize: 30, color: 'white'}} />
      </TouchableOpacity>
      <Animated.ScrollView  style={{height: screenHeight-this.props.height-60}}  onScroll={Animated.event(
          [{ nativeEvent: {
               contentOffset: {
                 y: this.state.scrollY
               }
             }
          }])}
        scrollEventThrottle={16}>
        <View  >
        {this.props.children}
        </View>
      </Animated.ScrollView>

      </View>
      )
  }
}
