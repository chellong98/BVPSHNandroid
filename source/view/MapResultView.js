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
import styles, {color} from './styles';
import {
  MenuProvider  ,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Icon,Left } from 'native-base';
import DropDown from './DropDown';
import { Text,Container, Header, Content, Card, CardItem,Item, Body,Input,Button,Label, Right, Radio,List,ListItem} from 'native-base';
import { NavigationActions } from 'react-navigation';
import {USER} from "../util/Config"
import RateUI from "../view/RateUI"
import LoadingView from "./LoadingView"
import {Conver} from "../util/Common"
import DialogConfirmCancel from "../control/DialogConfirmCancelController"
var _map: MapView.Animated;
const Dimensions = require('Dimensions');
type Props = {};
export default class MapResultView extends Component<Props> {

  constructor(props) {
   super(props);

   this.state = {
     map:null,
     rate :5,
     loading:false
   }
 
  }
  onPressCancel()
  {
     /* if (this.props.onPressCancel!=null)
      this.props.onPressCancel();
      */
     this.popup.show();
  }
  onPressAccept()
  {
    
   
    if (this.props.onPressAccept!=null)
    this.props.onPressAccept();
    
  }
  onPressCompleted()
  {
    if (this.props.onPressCompleted!=null)
    this.props.onPressCompleted();
  }
  onPressButtonRate(value)
  {
    if (this.props.onPressRate!=null)
    this.props.onPressRate(value);
  }
  

  showbutton(data)
  {
    if ((data.status==0||data.status==1)&&global.login.user_type==USER.CUSTOMER)
    {
     return (
     <CardItem>
       <Button warning full  style={{width:'100%'}} onPress = {()=>this.onPressCancel()}>
          <Text>Huỷ lịch</Text>
       </Button>
       </CardItem>);
    }
    else if (data.status==0&&global.login.user_type==USER.DOCTER){
      return (
        <CardItem>
          <Button success full  style={{width:'100%'}} onPress = {()=>this.onPressAccept()}>
             <Text>XÁC NHẬN</Text>
          </Button>
          </CardItem>);
    }
    else if (data.status==1){
      return (<View style={{flex:1,flexDirection:"column",paddingLeft:10,paddingRight:10,paddingBottom:10}}> 
      <View style={{padding:4}}> 
        <Text style={{fontSize:16,fontWeight:'bold'}}>Điện thoại - Note</Text>
        <Text style={{fontSize:14}}>{data.patient_phone+" - " +data.comment||"Trống"}</Text>
         
      </View>
      <Button success full  style={{width:'100%'}} onPress = {()=>this.onPressCompleted()} ><Text>Hoàn thành</Text></Button> 
      </View>);
    } else if (data.status==2){
      if (global.login.user_type==USER.DOCTER){
        return (<View style={{flex:1,flexDirection:"column",paddingLeft:10,paddingRight:10,paddingBottom:10}}> 
        <View style={{padding:4}}> 
        <Text style={{fontSize:16,fontWeight:'bold'}}>Điện thoại - Note</Text>
        <Text style={{fontSize:14}}>{data.patient_phone+" - " +data.comment||"Trống"}</Text>
         
        </View>
        </View>);
      }
      else{
        return (<View style={{flex:1,flexDirection:"column",paddingLeft:10,paddingRight:10,paddingBottom:10}}> 
        <View style={{padding:4}}> 
        <Text style={{fontSize:16,fontWeight:'bold'}}>Điện thoại - Note</Text>
        <Text style={{fontSize:14}}>{data.patient_phone+" - " +data.comment||"Trống"}</Text>
         
        </View>
        <RateUI changeValue={(value)=>this.ratingChange(value)}  default = {data.rate-1}/>
        {  btnRate(data.rate,this)  }
        </View>);
      }

    }
    function btnRate(rate,parent)
    {
      if (rate<=0)
       return (<Button success full  style={{width:'100%'}} onPress = {()=>{parent.onPressButtonRate(  parent.state.rate)}}  ><Text>Đánh giá</Text></Button> ) 
    }
  }
  
  ratingChange(value){
    this.state.rate = value;
    if (this.props.ratingChange!=null)
     this.props.ratingChange(value)

  }
  
  reLoad()
  {
    this.props.reload();
  }
  endLoad()
  {
    loading = false; 
    this.setState({loading});
  }
  pressCall()
  {
    if (this.props.pressCall!=null)
    this.props.pressCall()
  }
  _butotnCall()
  {
    if (this.props.data.status==1 && global.login.user_type==USER.DOCTER )
    {
      return <View style={{padding:5,margin:3,backgroundColor:color.primary,position:'absolute',top:60,right:0}}>
      <TouchableOpacity onPress={()=>{ this.pressCall()}}>
      <Text style={{color:'white'}}>Gọi ngay</Text>
      </TouchableOpacity>
      </View>
    }
  }
  render() {
    var data = this.props.data;
    var str2 = "";
    if (data!=null)
    {
      if (data.comment =="null") data.comment=""

      str2 = Conver.dateToDifference(data.date_time) ;
    }
    const { goBack } = this.props.navigation;
    return (
    
        <Container>
            <MenuProvider >
       {/* <LoadingView loading={this.state.loading} />*/}
   
      <DialogConfirmCancel ref={(popup)=>{this.popup = popup}} id = {this.props.id} loading={()=>{ loading = true; this.setState({loading})  }}  endLoading={()=>{ loading = false; this.setState({loading}); this.reLoad() }} />
  
    
      <Header style={{}} backgroundColor={color.primary} androidStatusBarColor={color.primary}>
            <Body style={{flex:1,flexDirection:"row"}}>
            <TouchableOpacity    onPress={ () => { 
                this.props.reload()
                goBack()} } >
                <Icon name='arrow-back' style={{fontSize: 30, color: 'white'}} />

                </TouchableOpacity>
                <Text style={{paddingLeft:10,fontSize: 20, justifyContent: 'center', color: 'white'}}>
         
                 Lịch đặt khám</Text>
            </Body>
        
        </Header>

      <MapView.Animated
          provider={PROVIDER_GOOGLE}
 					showsUserLocation={true}
 					showsCompass={true}
 					loadingEnabled={true}
 					toolbarEnabled={true}
 					zoomEnabled={true}
 					rotateEnabled={true}
          style={styles.map}
          ref={component => {_map= component; if (component==null) return; if (this.props.onMap!=null) this.props.onMap(component._component)}}
  >

     </MapView.Animated>
     {this._butotnCall()}
     <View  style= {{position: 'absolute',bottom:0, margin:10,width:Dimensions.get('window').width-20}}>
  <Content>
     <Card>
          <CardItem  style={{ justifyContent: 'center', flex: 1,flexDirection:'column'  }}>
           <Text style={{padding:5,color:color.primary,fontSize:20}}>{Conver.dateToDifference(data.updated)+" / " + Conver.format(Conver.day2VND(data.tam_date ) + Conver.day2VND(data.vs_date )) + " đ" }</Text>
           <Text style={{color:'gray',fontSize:12,textAlign:"left"}}> {data.date_time+"("+str2+")"} </Text>
            <View style={{flex:1,flexDirection:'row'}} >
            <Text style={{color:'gray',fontSize:12,textAlign:"left"}}> {'Tắm: '+data.tam_date+' N'} </Text>
            <Text style={{color:'gray',fontSize:12,textAlign:"right"}}> {'VS: '+data.vs_date+' N'} </Text>
            </View>
           </CardItem>
         
            {  this.showbutton(data) }

           

     </Card>
     
</Content>
    </View>
    </MenuProvider>
  </Container>
 
    );
  }

}
