import React, { Component } from 'react';
import { Text,Container, Header, Content, Card, CardItem,Item, Body,Input,Button,Label,Left } from 'native-base';
import {View ,TouchableOpacity,Image,ScrollView,Animated } from 'react-native';
import CollapsingToolbar from '../view/CollapsingToolbar'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

function makeRender(id,title,context,onclick)
{
  var index = id
  return ( <Card  >

    <CardItem  bordered = {true}>
      <Left>
        <Text>{title}</Text>
        </Left>
    </CardItem>
    <CardItem>

    <RadioForm
      formHorizontal={false}
      labelHorizontal={true}
    >
        {context.map((obj, i) => {
          obj.value = i;
          return ( <View  >
            <RadioButton labelHorizontal={true} key={i} >
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={obj.selected}
                onPress = {(val)=>{if (onclick!=null){
                   onclick(index,val)
                   context.map((obj, i)=>(context[i].selected = false))
                    context[val].selected  = true;
                 }}}
                borderWidth={1}
                buttonInnerColor={'#2196f3'}
                buttonOuterColor= { (obj.selected)?'#2196f3':"#888"  }
                buttonSize={10}
                buttonOuterSize={15 }
                buttonStyle={{}}
                buttonWrapStyle={{marginLeft: 10}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress = {(val)=>{if (onclick!=null){
                   onclick(index,val)
                   context.map((obj, i)=>(context[i].selected = false))
                    context[val].selected  = true;
                 }}}
                labelStyle={{fontSize: 14, color: (obj.selected)?'#2ecc71':'#888','width':'100%'}}
                labelWrapStyle={{}}
              />
              </RadioButton>
            </View>)
        })}
    </RadioForm>
  </CardItem>
  </Card>)
}


export default makeRender;
