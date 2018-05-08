import React, { Component } from 'react';
import MapView,{Marker,Callout} from 'react-native-maps';
import {
  Platform,
  StyleSheet,

  View,
  TouchableOpacity,
  Image,Button
} from 'react-native';
 
import {Text,Icon} from 'native-base';

import styles from '../view/styles';

var module = {

  image_0star:require('../../images/doctor_female_avt_0star.png'),
  image_1star:require('../../images/doctor_female_avt_1star.png'),
  image_2star:require('../../images/doctor_female_avt_2star.png'),
  image_3star:require('../../images/doctor_female_avt_3star.png'),
  image_4star:require('../../images/doctor_female_avt_4star.png'),
  image_5star:require('../../images/doctor_female_avt.png'),
  getImage(numStar) {
    if(numStar==0) return this.image_0star; 
    if(numStar==1) return this.image_1star;
    if(numStar==2) return this.image_2star;
    if(numStar==3) return this.image_3star;
    if(numStar==4) return this.image_4star;
    if(numStar==5) return this.image_5star;
  
  },
  makeMarkerDoctor(marker)
  {
    marker.onPress = ()=>(  marker.evenPress(marker))
    // marker.showCallout()
      return(<Marker  
            coordinate={marker.latlng}
           
            key={marker.id}
            image={this.getImage(marker.star)} >
            
            {this.customViewer(marker)}
            </Marker>);
  },
  markerStar(numStar) {
    if(numStar==0) {
      return (
        <View style={styles.numStar}>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>
        </View>) 
    }
    // console.log(numStar)
    if(numStar==1) {
      return (
        <View style={styles.numStar}>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#9AA540'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>
        </View>)  
    }
    if(numStar==2) {
      return (
        <View style={styles.numStar}>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#859F30'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#859F30'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>   
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>  
        </View>)        
    }
    if(numStar==3) {
      return (
        <View style={styles.numStar}>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#6C9C49'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#6C9C49'}}/>   
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#6C9C49'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>   
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>           
        </View>)  
    }
    if(numStar==4) {
      return (
        <View style={styles.numStar}>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#4DA32F'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#4DA32F'}}/>   
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#4DA32F'}}/>           
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#4DA32F'}}/>
          <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: 'gray'}}/>
        </View>)  
    }
    if(numStar==5) {
      return (
      <View style={styles.numStar}>
        <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#00a652'}}/>
        <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#00a652'}}/>   
        <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#00a652'}}/>           
        <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#00a652'}}/>
        <Icon ios={"ios-star"} android={"md-star"} style={{fontSize: 10, color: '#00a652'}}/>
      </View>)      
    }
    
  },
  customViewer(marker)
  {
  return ( <Callout 
  onPress = { ()=>{ marker.onPress() } }
  >
      <Text style={styles.markerTitle}>{marker.title}</Text>
      
    <View style = {{felx:1, flexDirection:"column" }}>
      <Text style={styles.markerSub}>{marker.sub+"  "}</Text>
      {this.markerStar(marker.star)}
   </View>
  </Callout> )
  }
}

export default module;
