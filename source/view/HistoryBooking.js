import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Container, Header, Body, Left, Icon, List, ListItem,Content,Thumbnail, Right} from 'native-base';
import { NavigationActions } from 'react-navigation';
import ManageListCustom from "./ManageListCustom"
import LoadingView from "./LoadingView"
import {color} from "./styles"
export interface Props {
    navigation: any,
    data: any,
}
export interface State {}


export default class HistoryBooking extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            loading:true
        }
    }

   
 
  render() {

    if (this.props.data!=null)
    {
        this.state.loading = false;
    }
    return (
      <Container style={{flex: 1}}>
        <LoadingView loading={this.state.loading} />
        <Header style={styles.header} androidStatusBarColor={color.primary} backgroundColor={color.primary}>
            <Body style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={ () => {this.props.navigation.dispatch(NavigationActions.back())} } >
                    <Icon name="arrow-back" style={{color: 'white'}}/>
                </TouchableOpacity>
                <Text style={{color: 'white', fontSize:20, }}> Lịch sử đặt</Text>        
            </Body>
        </Header>

        <View style={{flex: 1}}>
           <ManageListCustom {...this.props}/>
        </View>
      </Container>
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