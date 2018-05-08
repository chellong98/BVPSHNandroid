 import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Picker,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import MapView, { Marker } from 'react-native-maps';
import styles,{color} from './styles';
import {Button,Header,Container,Text} from "native-base"
import {Icon,Left } from 'native-base';
import DropDown from './DropDown';

type Props = {};
export default class MapViewForm extends Component<Props> {
  static navigationOptions = {

  };
  constructor(props) {

   super(props);

   this.state={
     show:false,
     value:this.props.showValue,
   }
   this.changShow = this.changShow.bind(this)
   this.renderItem = this.renderItem.bind(this)
   this.defautRender = this.defautRender.bind(this)
    this.showDropDown = this.showDropDown.bind(this)
    this.getValue = this.getValue.bind(this);

  }
  changShow()
  {
    var show =!this.state.show;
    this.setState({show});


  }
  onPress() {


      this.parent.props.showValue = this.parent.getValue(this.value)
      this.parent.state.value = this.value
        this.parent.changShow();
        if (this.parent.props.onPress!=null)
        {
          this.parent.props.onPress(this.value);
        }
  }
    getValue(value)
  {
      if (this.props.getValue!=null)
      return this.props.getValue(value)
      return value;
  }
  getKey(value)
  {
      if (this.props.getKey!=null)
      return this.props.getKey(value)
      return value
  }
  showDropDown()
  {//this.props.districs

    if (!this.state.show) return;

      if ( this.props.listItem==null) return
 
    

    return ( <ScrollView style={{maxHeight:200,backgroundColor:this.props.backgroundColor,width:this.props.width}} >
      {this.props.listItem.map( (value,i) => {   return this.renderItem(value) })}
   </ScrollView>)
  }
  renderItem(value)
  {
  var  render = this.defautRender ;

    if (this.props.renderItem!=null)
    {
      render =  this.props.renderItem;
    }
    return (<TouchableOpacity  key = {this.getKey(value)} onPress = {this.onPress.bind({parent:this,value:value})}>
      {
          render(value)
      }
    </TouchableOpacity>)

  }

  defautRender(value)
  {
      return (<Text key = {value} style={{fontSize:this.props.fontsize,color:this.props.color}}  >{this.getValue(value)}</Text>)
  }
  render() {
    return (
      <View {...this.props}>
     <TouchableOpacity   onPress={this.changShow}  >
       <Text style={{fontSize:this.props.fontsize,color:this.props.color,height:this.props.height,width:this.props.width,padding:10}} >
         {this.getValue(this.state.value)}
       </Text>
    </TouchableOpacity  >
      {this.showDropDown()}
  </View>



    );
  }
}
