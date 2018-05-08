import React, {Component} from 'react';
import {Alert} from 'react-native'
import DialogConfirmBooking from '../view/DialogConfirmBooking';
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import {Conver} from "../util/Common"

export default class DialogConfirmBookingControl extends Component  {
    constructor(props) {
        super(props);
        this.state = {
          data:{}
        }
        this.setData= this.setData.bind(this);
         console.log(this.props.data);
         this.onSubmit = this.onSubmit.bind(this)
    }
    
    clacTotal()
    {
    
        this.state.total = Conver.format((Conver.day2VND(this.props.tam ) + Conver.day2VND(this.props.vs )))+" VND"

    }
    render() {
        this. clacTotal();
        return <DialogConfirmBooking  {...this.props}  onSubmit = {this.onSubmit} total = {this.state.total}/>
    }
    onSubmit (docterid, sdt, tam, vs , dt)
    {
       var login =  global.login;
        if (sdt==null ||sdt == "" || (tam==0 && vs ==0) )
        {
            Alert.alert("Lỗi","Vui lòng chọn một dịch vụ và nhập đầy đủ thông tin ")
            return;

        }
       request = new ServerRequest(Package.Booking(login.p_id,docterid,sdt,dt,tam,vs,login.longitude,login.latitude ));
       request.setOnCompleted((cmd,json)=>{
            console.log("json")
            console.log(json)
         if (json.ERR_CODE!=0)
         {
            Alert.alert("Lỗi",json.Message)

           return;
         }
         Alert.alert('Đặt lịch thành công!')
         this.props.cancel(); 
         return;
        //  this.props.navigation.goBack();
        //  this.props.navigation.navigate("MapResultController",{id:json.USER_TYPE});
       })
       request.execute();
 
    }
    setData(data)
    {
     this.setState({data})
    }
}
