import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Picker,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import MapView, { Marker ,PROVIDER_GOOGLE} from 'react-native-maps';
import styles, {color} from './styles';
import {Icon,Left } from 'native-base';
import DropDown from './DropDown';
import { Text,Container, Header, Content, Card, CardItem,Item, Body,Input,Button,Label, Right, Radio,List,ListItem} from 'native-base';
import { NavigationActions } from 'react-navigation';
import {USER} from "../util/Config"
 
 
type Props = {};
export default class ReateUI extends Component<Props> {

  constructor(props) {
   super(props);

   this.state = {
     map:null,
     value:5,
     max:5
   }
   
   this.star = require("../../images/star.png")
   this.star_dis = require("../../images/starB.png")
   if (this.props.default!=null)
   {
       this.state.value = this.props.default;
   }
   if (this.state.value == 0) this.state.value = 5;
  } 

  makeStar(index,touch)
  {
      return (
        <TouchableOpacity index = {index} onPress={()=>{this.itemChange(index)}}  >
            <View style={{width:40,height:40 }}>
                <Image
                        style={{width:40,height:40,position:'absolute'}}
                        source={ this.star_dis}
                    />
                {  this.makeTouch(index,touch) }
        </View>
       </TouchableOpacity>
      )
  }
  itemChange(index){
    var value = index;
    this.setState({value});
    if (this.props.changeValue!=null)
    {
        this.props.changeValue(index+1);
    }
  }
  makeTouch(index,touch)
  { 
      if(touch)
      return(
        <Image
            style={{width:40,height:40}}
            source={ this.star}
        />)
       
  }
  makeList(max,value)
  {
    var lst = [];

    for (var i = 0 ;i<max;i++)
    {
        var touch = true;
 
        if(i > value) touch = false;


       var v = this.makeStar(i,touch);
       lst.push(v);
    }

    return lst;
}
  render() {
    var  max = this.state.max;
     var value = this.state.value;
     console.log('redraw')
    return (  
 
        <View style={{height:40,flex:1,flexDirection:"row", justifyContent:'center',margin:10}}>
           
           {  this.makeList( max, value )  }
           

        </View>
 
    );
  }

}
