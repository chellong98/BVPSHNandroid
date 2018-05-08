
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
    TouchableOpacity,
} from 'react-native';


import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
const {height, width} = Dimensions.get('window');
type Props = {};
import { Container, Header, Content, Card, CardItem,  Body,Input,Item,Form,Button} from 'native-base';

var welcome_value = [
  [  require('../../images/ic_intro_chat.png'),"CHAT VÀ GỌI THOẠI",["Tương tác trực tiếp với bác sĩ chuyên khoa","và hoàn toàn yên tâm về chất lượng"]],
  [  require('../../images/ic_intro_xetnghiem.png'),"XÉT NGHIỆM TẠI NHÀ",["Lấy mẫu trực tiếp tại nhà và cho kết quả","chính xác đến tuyệt vời về các bệnh phổ biến"]],
  [  require('../../images/ic_intro_booking.png'),"ĐẶT HẸN KHÁM",["Gặp trực tiếp bác sĩ tại phòng khám khi","trường hợp khẩn cấp phải xử lý ngay"]],
  [  require('../../images/ic_travel.png'),"BẢN TIN SỨC KHỎE",["Khỏe đẹp suốt cả ngày khi mà có quá nhiều","tin tức, đây là nguần tin đáng xem nhất"]]
];

export default class App extends Component<Props> {
static navigationOptions = {
header: null,
};
constructor(props){
  super(props)
  this.current = 0;
  this.state={display:false}
}
  render() {

    var renderView =[];

    for (var k in welcome_value){

      view = this.getRender( welcome_value[k][0] , welcome_value[k][1],welcome_value[k][2])
      renderView.push(view);
      this.onPressNext = this.onPressNext.bind(this);
    }
    //this.props.navigation.navigate("Login")
    return (
      <View style={{flex:1}}>
              <IndicatorViewPager  ref={pageviewer => { this.pageviewer = pageviewer }}
                onPageSelected = {(page)=>{  this.slideNext(page.position)  }}
                  style={{height:height}}
                  indicator={this._renderDotIndicator()}
              >
                { renderView }
              </IndicatorViewPager>
              {this.showNext()}
          </View>
    );
  }
    showNext()
  {
    if (!this.state.display) return
    else
    return (  <View style={{ alignSelf:'flex-end',position:'absolute', bottom:2,padding:3}}>
      <TouchableOpacity  onPress={this.onPressNext}>
      <Text  style={{ padding:10,color:'white' }}>Tiếp theo</Text>
     </TouchableOpacity>
    </View>);

  }
  getRender(image , title,labels)
  {
    var lb = [];
    for (var k in labels)
    {
      lb.push((<Text style={styles.contextLabel}>{labels[k]} </Text>));
    }
    return (<View style={styles.container}>
      <Image style={styles.image}
        source={image}
      />
      <Text style={styles.title} >{title} </Text>
      <View style={styles.context} >
        {lb}
      </View>

    </View>)
  }
  onPressNext(){
 this.props.navigation.navigate("LoginFB")
  }
  slideNext(page){
      this.current=page
      if (this.current==welcome_value.length-1)
      {
        this.setState((old)=>{old.display = true;return old})
      }
  }
  _renderDotIndicator() {
      return <PagerDotIndicator pageCount={4}/>;
  }
}
const styles = StyleSheet.create({
  container: {
   backgroundColor:'#1AA094',
      flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
  },
  image:{
    width:200,
    height:200
  },title:{
    color:'#ffffff',
    marginTop:50,
    fontSize:20,
    fontWeight: 'bold',
  },context:{
    fontSize:16,
    marginTop:20
  },contextLabel:{
    color:'white',
    fontSize:16,
    textAlign:'center'
  }
});
