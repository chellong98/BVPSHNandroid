import React, {Component} from 'react';

import DialogConfirmBooking from '../view/DialogConfirmBooking';
import Package from "../service/Package";
import ServerRequest from "../service/ServerRequest";
import {Conver} from "../util/Common"
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import DialogConfirmCancelView from '../view/DialogConfirmCancelView'

import {
    MenuProvider  ,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
 
export default class DialogConfirmCancelController extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:{}
        }

         this.onSubmit = this.onSubmit.bind(this)
         this.slideAnimation = new SlideAnimation({
            slideFrom: 'bottom',
          });
           
       request = new ServerRequest(Package.getReason());
       request.setOnCompleted((cmd,json)=>{

            console.log(  data = json.DATA)
         if (json.ERR_CODE!=0)
         {
 
           return;
         }
         data = json.DATA
         this.setState({data})
       })
       request.execute();
     

    }
    
 
    render() {
    
        return    <PopupDialog style={{margin:10}} height = {200}  
        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        dialogAnimation={this.slideAnimation}
        >
       <DialogConfirmCancelView  {...this.props}  onSubmit = {this.onSubmit}  cancel = {()=>{this.popupDialog.dismiss()}}  data = {this.state.data} />
        </PopupDialog> 
 
    }
    show()
    {
        this.popupDialog.show() 
    }
    onSubmit ( str,id)
    {
       
        this.props.loading()
        request = new ServerRequest(Package.bookingStatus(this.props.id,3,str));
        request.setOnCompleted((cmd,json)=>{
      
        this.props.endLoading()
          if (json.ERR_CODE!=0)
          {
            
            return;
          }
          this.popupDialog.dismiss()
          data = json.DATA
          this.setState({data})
        })
        request.execute();

    }
    
}
