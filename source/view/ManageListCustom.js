import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert,RefreshControl} from 'react-native';
import {Container, Header, Body, Left, Icon, List, ListItem,Content,Thumbnail, Right} from 'native-base';
import {Conver} from "../util/Common"
import {USER} from "../util/Config"
export default class ManageListCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
        this.taoHang = this.taoHang.bind(this);
        this.itemPress = this.itemPress.bind(this);
    }

    itemPress(data)
    {
        if (this.props.onPressItem!=null)
        this.props.onPressItem(data);
    }
    taoHang(property) {
        if (this.props.filter!=null)
        {
            if (!this.props.filter(property)) return <View/>
        }
        if (property==null) return ;
        this.state.index++;
        var index =   this.state.index;
        var rowStyle = Conver.status2Style(property.status);
        var total =  Conver.format(Conver.day2VND(property.tam_date ) + Conver.day2VND(property.vs_date )) + " đ"
        var str = Conver.dateToDifference(property.updated);
        var str2 = Conver.dateToDifference(property.date_time) ;
         
        return(
            
            <TouchableOpacity avatar style={{paddingBottom: 10, paddingTop: 5, paddingHorizontal: 5, flexDirection: 'row', backgroundColor: (index%2==0) ? '#FFFFFF' : '#F9F9F9'}} onPress={()=>{this.itemPress(property)}}>
                <Left style={{flexDirection: 'row'}}>
                    <Thumbnail source={ require("../../images/icon_docter.png") } />
                    <View style={{padding: 10}}>
                        <Text style={{fontSize: 17, color: 'black'}} >{(global.login.user_type==USER.DOCTER)?property.patient_name:property.docter_name}</Text>
                        <Text note style={{color:'gray',fontSize:12}}> {(global.login.user_type==USER.DOCTER)?str2:"Tổng tiền:"+total}  </Text>
                    </View>
                </Left>
                <Right>
                    <Text style={{color:'white', fontSize: 12, backgroundColor: rowStyle.background,padding:2}}>{rowStyle.text}</Text>
                    <Text note  style={{color:'gray',fontSize:12}} >{str}</Text>
                </Right>
            </TouchableOpacity> 
        )
    }
  render() {
    this.state.refreshing = false;
    return (
      
        <View style={{flex: 1}}>
            <List
                dataArray = {this.props.data}
                renderRow= {this.taoHang }
                refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => { if( this.props.listreload!=null) this.props.listreload()}}
                    />
                  }
                
            ></List>
        </View>
 
    )
  }
};

const styles = StyleSheet.create({
    header: {
       
    },
    body: {
        flex: 1,
       
    }
});