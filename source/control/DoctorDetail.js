import React, { Component } from 'react';
import { Alert  } from 'react-native'
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import DoctorDetailView from "../view/DoctorDetailView";


export default class DoctorDetail extends Component {
  static navigationOptions = {
  header: null,
  };
  constructor(props)
  {
    super(props);

    this.state={

        services:[{
          title:"DỊCH VỤ TẮM BÉ SƠ  SINH",content:[
            {label:"3 Buổi/900.000 VNĐ",selected:false},
            {label:"4 Buổi/1.500.000 VNĐ",selected:false },
            {label:"10 Buổi/3.000.000 VNĐ",selected:false }
          ]},
          {
            title:"VỆ SINH TẦNG SINH MÔN",content:[
              {label:"3 Buổi/900.000 VNĐ",selected:false},
              {label:"4 Buổi/1.500.000 VNĐ",selected:false },
              {label:"10 Buổi/3.000.000 VNĐ",selected:false }
            ]} 
        ],
        docterDetail:{}
    }

    var docterid =this.props.navigation.state.params.data.id;
    request = new ServerRequest(Package.getDocterDetail(docterid));
    request.setOnCompleted((cmd,json)=>{
       if (json.ERR_CODE!=0) return ;
       var docterDetail =json.DATA;
      console.log(docterDetail)
       this.setState({docterDetail})

    })
    request.execute();

  }
  render() {

     return(<DoctorDetailView  onPress = {()=>{


     }} data = {this.state.docterDetail} services ={this.state.services}  navigation = {this.props.navigation}  />)
  }



}
