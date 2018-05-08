/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import styles,{color} from './styles';
import {Button,Header,Container,Text} from "native-base"
import {Icon,Left } from 'native-base';
import DropDown from './DropDown';
 
var _map: MapView.Animated;

type Props = {};
export default class MapViewForm extends Component<Props> {
  static navigationOptions = {

  };
  constructor(props) {
   super(props);

   this.state = {
     map:null,
     coordinate :this.getInitialState(),

   }
  

  }

  getInitialState() {
  return {
    coordinate: {
      latitude: 21.010209,
      longitude: 105.807799,
    },
  };
}
 
  
  render() {
    return (  
    <Container>
      
      <Header style={{backgroundColor:color.primary}} androidStatusBarColor={color.primary} >
        <Left  style={{padding:10,position:'absolute',left:5 ,top:10}}>
      
        <TouchableOpacity   onPress={ () => {this.props.navigation.navigate('DrawerOpen')} } >
          <Icon ios='ios-menu' android="md-menu" style={{fontSize: 30, color: 'white'}}/>
        </TouchableOpacity>
         
        </Left>

      </Header>
      <MapView.Animated
          provider={PROVIDER_GOOGLE}
 					showsUserLocation={true}
 					showsMyLocationButton={true}
 					showsCompass={true}

 					loadingEnabled={true}
 					toolbarEnabled={true}
 					zoomEnabled={true}
 					rotateEnabled={true}
          style={styles.map}
      
          ref={component => {_map= component; if (component==null) return; if (this.props.onMap!=null) this.props.onMap(component._component)}}
  >

          { this.props.markers.map((marker,i)=>{
            return marker;

          })}
     </MapView.Animated>
     {/*
     <Button style={styles.listLocal}  >
       <Text style={{fontSize:10,color:'black'}} >
          Vị trí của bạn
       </Text>

    </Button>
    */
    }
    <DropDown style={[styles.listLocal,{borderRadius:5}]} color={"black"}
      backgroundColor="white" 
      fontsize={12}
      
      showValue = {{name:"Vị trí của bạn"}}
      listItem = {this.props.districs}
      width = {130}
      getValue={(value)=>{return value.name}}
      getKey={(value)=>{return value.id}}
      renderItem= {(value)=>{
          return <Text style={{fontSize:12,padding:5}}>{value.name}</Text>
      }}
      onPress={(value)=>{

          this.onPress(value);
          this.forceUpdate()
      }}

    />

     
  </Container>
    );
  }
  onPress(value)
  {

    if (this.props.onChosseDistric!=null)
      this.props.onChosseDistric(value);
  }
}
