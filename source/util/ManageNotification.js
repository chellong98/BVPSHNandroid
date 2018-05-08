var PushNotification = require('react-native-push-notification');


var notic_1 = (element) => {
  console.log(element )
    let notificationDate = new Date(Date.now() + element.deltatime*1000 )
    let notificationMessage = "Bạn có cuộc gọi dịch vụ vào 1h nữa từ khách hàng: " +element.name
    PushNotification.localNotificationSchedule({
      message: notificationMessage,  
      date: notificationDate, 
      userInfo:{id: element.id,},
      id: element.id,
      data: {
        recordID: element.id,
      }
    })
   
  }
  NotificationFromList=(list)=>
  {

    for (var k in list)
    {
      var element = list[k]
      PushNotification.cancelLocalNotifications({id: element.id});
      notic_1(element);

    }
    
  }


export {
    notic_1    , NotificationFromList 
}