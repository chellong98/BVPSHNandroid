
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,Button,BackHandler
} from 'react-native';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import MapView, { Marker } from 'react-native-maps';
import MapViewForm from "../view/MapViewForm"
import MapHelper from "../util/MapHelper"
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import { NavigationActions } from 'react-navigation';
import RequetLocationPermission from "../util/Permission"
type Props = {};
export default class MapControl extends Component<Props> {


  constructor(props) {
   super(props);
   this.state = {
     map:null,
     listDocter: [],
     listDistric: [],
     markers:[],
     coords:null,
     move: false
   }


RequetLocationPermission();

   this.getDistric();
   this.clickMarker = this.clickMarker.bind(this);
   this.onMap = this.onMap.bind(this)
   this.onChosseDistric = this.onChosseDistric.bind(this)
    this.getAllDocter()
 
  }

getAllDocter(){

 var parent = this;
 request = new ServerRequest(Package.getAllDocter());
 request.setOnCompleted((cmd,json)=>{
    if (json.ERR_CODE!=0) return ;
   
      var listDocter = json.DATA;
          var markers = [];
          for (var k in listDocter)
          {
            marker =  parent.doctorToMarker(listDocter[k]);
            markers.push(marker);
          }
      parent.setState({markers});
 })
 request.execute();

}

clickMarker (marker)
{

this.props.navigation.navigate("DoctorDetail",{data:marker});
}
doctorToMarker(data)
{


      var marker =  MapHelper.makeMarkerDoctor(
          {
            evenPress:((marker)=>{this.clickMarker(marker)}),
            title:data.name ,
            id:data.id,
            star:data.star,
            sex_id:data.sex_id,
            sub:data.address,
            latlng:{  latitude:data.latitude,  longitude: data.longitude}
          }
       )

    return marker;
}
getDistric()
{
  var parent = this;
    request = new ServerRequest(Package.getDictrct());
    request.setOnCompleted((cmd,json)=>{
      if (json.ERR_CODE!=0) return ;
        /* distric struct
          id: 1, province_id: 1, name: "Quận Ba Đình", longitude: 21.035479, latitude: 105.826714
        */
      
         var listDistric = json.DATA;
         if (this.state.coords!=null)
         {
          listDistric.unshift({id:0,"province_id":0,"name": "Vị trí của bạn", latitude: this.state.coords.longitude, longitude:this.state.coords.latitude })
         }
         else
         listDistric.unshift({id:0,"province_id":0,"name": "Vị trí của bạn", latitude: global.login.longitude, longitude:global.login.latitude })
        
         this.setState({listDistric});


    })
    request.execute();
}


  onMap(map)
  {

    this.map = map;
     
   
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (this.move) return;
          this.move = true;
        this.setState((preview)=>{
          preview.coords = {};
          preview.coords.latitude =position.coords.latitude
          preview.coords.longitude =position.coords.longitude
          return preview
        })
        this.getDistric();
        this.onChosseDistric({latitude:position.coords.longitude,longitude:position.coords.latitude});
        console.log("set pos");
       },
       (error) => {
        console.log("error"+error)
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
  );
   
  }
  onChosseDistric(value){
//  this.map.animateToCoordinate(coordinate, 100);
    region={
      latitude:value.longitude ,
      longitude:  value.latitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
    coordinate= {
     latitude: value.latitude,
     longitude:value.longitude,
    }
    this.map.animateToRegion(region, 100);
  }
  render() {
    return ( <MapViewForm navigation = {this.props.navigation}
                onChosseDistric= { this.onChosseDistric }
                navigation = {this.props.navigation}
                markers = {this.state.markers}
                map = {this.state.map} districs = {this.state.listDistric}
                onMap = {this.onMap}
      />
    );
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    BackHandler.exitApp(); 
  return true;
  };
}
