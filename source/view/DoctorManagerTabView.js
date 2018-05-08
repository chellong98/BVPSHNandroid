import React, { Component } from 'react';
import {Animated,View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import {Container, Header, Body, Left, Icon, List, ListItem,Content,Thumbnail, Right} from 'native-base';
import ManageListCustom from "./ManageListCustom"
import LoadingView from "./LoadingView"
import {color} from "./styles"
export interface Props {
    navigation: any,
    data: any,
}
export interface State {}
export default class DoctorManagerTabView extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            loading:true
        }
    }
    onPressItem(value){
        if(this.props.onPressItem!=null)
        this.props.onPressItem(value)
    }
 loading()
 {
     if (!this.state.loading ) return 
     return   <View style={styles.modalBackground}>
     <View style={styles.activityIndicatorWrapper}>
     <ActivityIndicator
         animating={true} />
     </View>
 </View>
 }
  render() {

    if (this.props.data!=null)
    {
        this.state.loading = false;
    }
    return (
    
      <Container  style={{backgroundColor:"white"}} >
        <View style={{flex: 1}}> 
        {this.loading()}
           <ManageListCustom     {...this.props} filter = {this.props.filter} onPressItem={(value)=>{ this.onPressItem(value)}} />
        </View>
      </Container>
 
    )
  }
};
 
const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    activityIndicatorWrapper: {
      marginTop:100,
      height: 200,
      width: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    }
  });
  