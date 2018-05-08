import React, { Component } from 'react';
import DoctorActiveManager from './../view/DoctorActiveManager';
import {View,BackHandler} from "react-native"
import LoginHelper from "../util/LoginHelper"
import DoctorManagerTab from "../control/DoctorManagerTabController"
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import {color} from "../view/styles"
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Conver} from "../util/Common"
import {NotificationFromList} from "../util/ManageNotification"
export default class DoctorActiveManagerController extends Component {

  constructor(props)
  {
    super(props)
    this.state={data:{}}
    this.reload = this.reload.bind(this)
    this.reload();
  }
  reload()
  {
    
    request = new ServerRequest(Package.getBooking(global.login.d_id,"d_id") );
    request.setOnCompleted((cmd,json)=>{
       if (json.ERR_CODE!=0) return ;
       var data =json.DATA;
       var lstNote =  [];
       for (var k in data)
       {
         var element = data[k];
         
         if (element.date_time!=null){
            var splTime = element.date_time.split(' ')
            if (splTime.length >1)
            {
              element.date_time = splTime[1]+" "+splTime[0]+":00"
            }
         }
           
         data[k] = element;

         
         var delTime  = Conver.dateToDifferenceEx(element.date_time);
         if (element.status!=1) continue
         if (delTime[0] == -1)
         {
              if (delTime[1] ==0 ){
              var delx =10;
              if (delTime[2]>0){
                  var delx =  Math.max(delTime[2]-1,0)*60*60+delTime[3]*60+delTime[4];
              }else {
                 if (delTime[3]<10) continue;
              }
              var notic = {
                  name: element.patient_name,
                  deltatime:  delx,
                  id: element.id
              }
              
             var has = this.checkHasNotic(notic);

             if (has) continue;
              lstNote.push(notic);
              global.listNotic.push(notic)

            }
           
        }
       }
       NotificationFromList(lstNote);
       
       this.setState({data})
    })

    request.execute();

  }
  checkHasNotic(e)
  {
    for (var k in global.listNotic)
    {
        if (e.id == global.listNotic[k].id) return false;
    }
    return true;
  }
  onPressItem(value)
  {
    this.props.navigation.navigate("MapResultController",{id:value.id,reload:this.reload});
    
  }
  onPressOption()
  {
    this.props.navigation.navigate("Option")
  }
  render() {
    var tabs = {
      tabBarUnderlineStyle:{borderBottomColor: 'white'},
      textStyle:{color:"white",fontSize:14},
      activeTextStyle:{color:"white",fontSize:14},
      activeTabStyle:{backgroundColor: color.primary},
      tabStyle:{backgroundColor: color.primary}
    
    }
    
var listTab =[ <DoctorManagerTab 
            listreload = {()=>this.reload()}
                {...tabs}
                onPressItem = {(value)=>{this.onPressItem(value)}}
                heading="CHỜ XÁC NHẬN" data={this.state.data}  
                  filter = {(value)=>{
                    if (value.status==0) return true
                    return false
                  }}/>
            , <DoctorManagerTab
            listreload = {()=>this.reload()}
            {...tabs}
            onPressItem = {(value)=>{this.onPressItem(value)}}
            heading="ĐÃ XÁC NHẬN" data={this.state.data}
            filter = {(value)=>{
              if (value.status==1) return true
              return false
            }}/>
            ,<DoctorManagerTab
            listreload = {()=>this.reload()}
            {...tabs}
            onPressItem = {(value)=>{this.onPressItem(value)}}
            heading="KẾT THÚC" data={this.state.data}
             filter = {(value)=>{
              if (value.status==2) return true
            }}/>
            ,<DoctorManagerTab
            listreload = {()=>this.reload()}
            {...tabs}
            onPressItem = {(value)=>{this.onPressItem(value)}}
            heading="KHÁCH HỦY" data={this.state.data}
             filter = {(value)=>{
              if (value.status==3) return true
            }}/>
            ,<DoctorManagerTab
            listreload = {()=>this.reload()}
            {...tabs}
            onPressItem = {(value)=>{this.onPressItem(value)}}
            heading="BẠN HỦY" data={this.state.data}
             filter = {(value)=>{
              if (value.status==4) return true
            }}/>
              
            ]
    return ( <DoctorActiveManager   onPressOption = {()=>{this.onPressOption()}} listTable={listTab} onPressLogout={()=>{
      LoginHelper.logout(this.props.navigation.navigate,"Login")
    }} />
    )
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
 
};