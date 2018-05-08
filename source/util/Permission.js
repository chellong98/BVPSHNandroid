import { PermissionsAndroid } from 'react-native';
import {Platform, StyleSheet} from 'react-native';

async function requestLocationPermission() {
   
    requestPermission( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        'title': 'Kiểm tra vị trí của bạn',
        'message': 'Ứng dụng cần kiểm tra vị trí của bạn' +
                   'Xác nhận để cấp quyền truy cập cho ứng dụng.'
      })
  
}
 
async function requestPermission(id,opt)
{
    try {
        const granted = await PermissionsAndroid.request(
         id,opt
         
        )
     
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permission Success ")
        } else {
          console.log("Permission Faild")
        }
      } catch (err) {
        console.warn(err)
      }
}
const a = requestLocationPermission;
export default  a ;