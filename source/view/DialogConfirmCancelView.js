
import { Container, Content, Text, List, ListItem,Thumbnail, Header , Body, Item, Input,Button,Left} from "native-base";
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import {
  Platform,
  StyleSheet,

  View,
  TextInput,


  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'native-base';
import React, { Component } from 'react';
import {
    MenuProvider  ,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
export interface Props {
}
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
export default class DialogConfirmCancelView extends Component<Props> {
  constructor(props)
  {

      super(props);
      this.state = {
          sdt:"",
          time:"",
          "date":'',
          "d_id":"",
          valueStr:"",
          value:0

      }
      this.date = new Date();
  }

    selectItemMenu()
    {
       var  value = this.value;
       var parent = this.parent;
       var valueStr = value.Name
       parent.state.value = value.id
       parent.setState({valueStr})
    }
    render() {
        var data = [];
        var menu = []
        var arrdaata = [];
     
        if (  this.props.data  !=null)
        {
          data=  this.props.data ;
        }

        for (var k in data)
        {
            menu.push(<MenuOption  key = {data[k].id} style={{padding:10}} onSelect={this.selectItemMenu.bind({parent:this,value:data[k]})} text={data[k].Name}  />);
            if (   this.state.valueStr.length<1)    this.state.valueStr = data[k].Name;
            data[k].selected = false;
            data[0].selected = true;
            arrdaata.push( {label: data[k].Name, value:  data[k].Name,selected: data[k].selected}  ); 
        }
       
        
        
      
        return (   <View style={styles.container}>
                    <Header style= {styles.header} androidStatusBarColor='#00aa8d' backgroundColor='#00aa8d'>
                            <Thumbnail
                                style={{backgroundColor: '#00aa8d', position: 'absolute', left: 10}}
                                source= {require("../../images/icon_docter.png") }
                            />
                            <Left>
                            <Body style={styles.bodyHeader}>
                              <View style={{ position:'absolute','left':-40 }} >
                                <Text style={{color: 'white',fontWeight: '600'}}>LÝ DO HUỶ</Text>
                              </View>
                            </Body>
                            </Left>

                    </Header>
                    {/*
                    <RadioForm

                        formHorizontal={false}
                        labelHorizontal={true}
                        buttonColor={'#2196f3'}
                        animation={true}

                        >

                        {arrdaata.map((obj, i) => {

                        return ( 
                        <RadioButton labelHorizontal={true} key={i} >

                        <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={obj.selected}
                      onPress={()=>{}}
                        borderWidth={1}
                        buttonInnerColor={'#2196f3'}
                        buttonOuterColor= { (obj.selected)?'#2196f3':"#888"  }
                        buttonSize={10}
                        buttonOuterSize={15 }
                        buttonStyle={{}}
                 
                        />
                        <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                            onPress={()=>{}}
                        labelStyle={{fontSize: 14, color: (obj.selected)?'#2ecc71':'#888'}}
                        labelWrapStyle={{}}
                        />
                        </RadioButton>
                        )

                        })}
                        </RadioForm>

                        */
                    }
                    <View style={{borderColor:'gray',padding:20,paddingHorizontal:40}}>
                    <Menu style={{flexDirection:'column', paddingTop: 0, paddingHorizontal: 0,borderColor:'GRAY', borderWidth:1 }}>
                        <MenuTrigger >
                    
                             <Text underline = {false} style={{padding:10,fontSize:14,backgroundColor:'white'}} >{this.state.valueStr}</Text>
                     
                              
                  
                        </MenuTrigger>
                          
                          <MenuOptions   >
                       
                              {menu}
                             
                           
                          </MenuOptions>
                      </Menu>

                        
                         
                    </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: 10}}>
                            <Button onPress={()=>{this.props.cancel()}}  style={{flex: 3/10, justifyContent: 'center', backgroundColor: '#5B5B5B',height:35}}><Text>ĐÓNG</Text></Button>
                            <Text>   </Text>
                            <Button warning onPress={()=>{
                               
                              if (this.props.onSubmit!=null) this.props.onSubmit(this.state.valueStr,this.state.value)}

                            } style={{flex: 3/10, justifyContent: 'center', height:35}}><Text> HUỶ LỊCH</Text></Button>
                        </View>
               

                </View>
           
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        
    },
    header: {
        height: 70,
        flexDirection: 'column',
    },
    bodyHeader: {   marginRight: 100, },
    body:{flex: 4/10, backgroundColor: '#EAEAEA'}
})
