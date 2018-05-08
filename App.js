/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import MapView, { Marker } from 'react-native-maps';



type Props = {};
export default class App extends Component<Props> {
  static navigationOptions = {

};
  constructor(props) {
   super(props);
   this.state = {
     coordinate :this.getInitialState()
   }
   this.currentLocation = {lat:37.785834,lng:-122.406417}
        navigator.geolocation.getCurrentPosition(
          
         (position) => {
           console.log(position)
           this.setState((preview)=>{
             preview.latitude =-122.406417
             preview.longitude =37.785834
             return preview
           })
           console.log(position);
          },
          (error) => {
           console.log(error)
         },
         {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
   );

  }

  getInitialState() {
  return {
    coordinate: {
      latitude: 37.785834,
      longitude: -122.406417,
    },
  };
}

takeSnapshot () {

}

  render() {


   this.props.navigation.navigate("Welcome")
    return (<View style={styles.container}>
      <MapView provider="google"
 					showsUserLocation={true}
 					showsMyLocationButton={true}
 					showsCompass={true}
 					followsUserLocation={true}
 					loadingEnabled={true}
 					toolbarEnabled={true}
 					zoomEnabled={true}
 					rotateEnabled={true}
          style={styles.map} ref={map => { this.map = map }}>
     </MapView>

     <Text style={styles.text} onPress={this.takeSnapshot}>

     </Text>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   

  },
  text: {
    position: 'absolute',
    top:40,
    alignItems: 'center',alignSelf: 'flex-end'
  },
  map: {


  },
});
