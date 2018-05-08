
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
import MapResultView from "../view/MapResultView"
import MapHelper from "../util/MapHelper"
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import { NavigationActions } from 'react-navigation';
import RequetLocationPermission from "../util/Permission"
import Communications from 'react-native-communications';

type Props = {};

export default class MapResultController extends Component<Props> {


  constructor(props) {
     super(props);
     this.state = {
       map:null,
       coords:{},
       data:{}
     }
     this.onMap = this.onMap.bind(this)
     this. loadData();
  
}


  loadData()
  {
    var id =111;
    var reload = null
    try{
    if (this.props.navigation.state.params.id!=null)
      id = this.props.navigation.state.params.id;
      reload = this.props.navigation.state.params.reload
    }catch(e)
    {}

    this.id = id
    this.reload = reload;
    if (reload!=null)
    reload();
    var t =0;
    if (global.login.user_type == 2) t = 1;

    var request = new ServerRequest( Package.getOneBooking(id,t));

     request.setOnCompleted((cmd,json)=>{
         if (json.ERR_CODE!=0) return;
         var data = json.DATA;
         if (data.date_time!=null){
          var splTime = data.date_time.split(' ')
          if (splTime.length >1)
          {
            data.date_time = splTime[1]+" "+splTime[0]+":00"
          }
       }
         
         this.setState({data});
         this.forceUpdate()
     })
     request.execute();
  }
  rate(value)
  {

    var request = new ServerRequest( Package.rateBooking(    this.id ,value));
    request.setOnCompleted((cmd,json)=>{
        if (json.ERR_CODE!=0) return;
        this.loadData()
    })
    request.execute();

  }
  
  changeStatus(value)
  {
    request = new ServerRequest(Package.bookingStatus( this.id ,value,""));
        request.setOnCompleted((cmd,json)=>{

          if (json.ERR_CODE!=0)
          { 
            return;
          }
          this.loadData()
          this.reload();
        })
        request.execute();
    
  }
  pressCall()
  {
      if (this.state.data!=null)
      {
        if (this.state.data.patient_phone!=null)
        { 
          Communications.phonecall(this.state.data.patient_phone, true)
        }
      }
  }
  onMap(map)
  {

    this.map = map;
     
   
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (this.move) return;
          this.move = true;
       
        // this.getDistric();
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
    return ( <MapResultView 
      onMap = {(map)=>{
          this.onMap(map);
      }}
      onPressAccept = {()=>{
        this.changeStatus(1)
      }}
      onPressCompleted = {()=>{
        this.changeStatus(2)
      }}
      pressCall ={()=>this.pressCall()}
       onPressRate = {(value)=>{
      this.rate(value)
    }} reload = {this.reload } navigation = {this.props.navigation}  data = {this.state.data} onPressCancel={()=>console.log("CancelClick")  } id = {this.id} reload = {()=>{
      this.loadData(); 

    }}/>
    );
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    
   
    this.props.navigation.dispatch(NavigationActions.back())
  return true;
  };
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    
   
    this.props.navigation.dispatch(NavigationActions.back())
  return true;
  };

}
