import {

    StyleSheet,

  } from 'react-native';
  const Dimensions = require('Dimensions');

  export default StyleSheet.create({
    container: {
      flex: 1,
      width: undefined,
      height: undefined,
      backgroundColor:'transparent',
      paddingTop: 15,
      flexDirection: 'column',
      borderWidth:0,
      marginTop:-85,
      paddingTop:20,
      zIndex:100,
    },
    icon: {
      width: 24,
      height: 24,
    },
    image: {
      height: 110,
      borderRadius: 55,
      width: 110,
      borderWidth: 3,
      borderColor: '#ffffff',
      marginTop: 30,
    },titleCardName:{

    },
    infoCard:{
      fontSize:10,
      color:'gray'
    },
    containerMap: {
      position: 'absolute',
      top: 0 ,
      left: 0,
      right: 0,
      bottom: 0,

    },
    listLocal: {
      position: 'absolute',
      top:70,
      alignItems: 'center',alignSelf: 'flex-end',
      margin:8,
     

    },
    map: {

      width:"100%",
      height:Dimensions.get('window').height-60
    },markerTitle:{
        fontSize:12,
       fontWeight: 'bold',
        width:"100%",
        textAlign:"center"

    },markerSub:{
        fontSize:10,
        color:'gray',
     
        textAlign:"center"

    },TextMod:{
        color:'white',
 
    },markerStar:{
      fontSize:10,
      color:'gray',
    },
    numStar: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}
  });
const color = {
  primary:"#00a652"
}
export {color}
