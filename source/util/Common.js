import {Config,Log,CMD} from '../util/Config'


 
Conver = {
        day2VND(inx)
        {
            switch (inx)
            {
                case 0: return 0;
                case 3: return 900000;
                case 4: return 1500000;
                case 5: return 1500000;
                case 10: return 3000000;
            }
        },
        index2Day(inx)
        { switch (inx)
            {
            case 0: return 0;
            case 1: return 3;
            case 2: return 4;
            case 3: return 10;
            }
        },
        status2Style(id)
        {
            switch(id)
            {
            case 0:
             var   background = "#00A652";
             var   strStatus = "Chờ xác nhận"
                return {background:background,text:strStatus}
            case 1:
                background = "#b7640b";
                strStatus = "BS xác nhận"
                return {background:background,text:strStatus}
            case 2:
                background = "#40b1e5";
                strStatus = "Hoàn thành";
                return {background:background,text:strStatus}
            case 3:
                background = "#FF0101";
                strStatus = "Đã hủy";
                return {background:background,text:strStatus}
            }
            
        },format(intx){

            Number.prototype.format = function(n, x, s, c) {
                var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                    num = this.toFixed(Math.max(0, ~~n));
    
                return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
            };
            return intx.format();
        },
        sqlToJsDate(sqlDate){
                try{
                if (sqlDate == null)   return new Date();
                var sqlDateArr1 = sqlDate.split("/");
                
                var  sDay = sqlDateArr1[0]   ;

                var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
                var sqlDateArr2 = sqlDateArr1[2].split(" ");
                var sYear = sqlDateArr2[0];

                var sqlDateArr3 = sqlDateArr2[1].split(":");
                var sHour = sqlDateArr3[0];
                var sMinute = sqlDateArr3[1];
                var sqlDateArr4 = sqlDateArr3[2].split(".");
                var sSecond = sqlDateArr4[0];
       
            
              
                return new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond);
                }catch(e){
                    return new Date();
                }
            },
        dateToDifference(strDate)
        {
            var d = new Date();
            var date1_ms =this.sqlToJsDate(strDate).getTime();
            var date2_ms = d.getTime();
            var difference_ms = Math.abs(date2_ms - date1_ms);
            var strTime = "";
            var text = "trước"
            if (date2_ms - date1_ms <0 )text = 'sau'
         
            if (difference_ms<2000)
            {
              return "Vừa xong"
            }
            else
            {
                difference_ms = difference_ms/1000;
                var seconds = Math.floor(difference_ms % 60);
                difference_ms = difference_ms/60; 
                var minutes = Math.floor(difference_ms % 60);
                difference_ms = difference_ms/60; 
                var hours = Math.floor(difference_ms % 24);  
                var days = Math.floor(difference_ms/24);
                if (days>0) 
                    return days+ " ngày "+text;
                else if (hours>0)
                   return hours+" giờ "+text;
                else if(minutes>0)  
                   return minutes+" phút "+text;
                else  
                  return seconds+" giây "+text;
            }
           

        },
        dateToDifferenceEx(strDate)
        {
            var d = new Date();
            var date1_ms =this.sqlToJsDate(strDate).getTime();
            var date2_ms = d.getTime();
            var difference_ms = Math.abs(date2_ms - date1_ms);
            var x=1;
            if ( date2_ms - date1_ms <0 ) x =-1
          
                difference_ms = difference_ms/1000;
                var seconds = Math.floor(difference_ms % 60);
                difference_ms = difference_ms/60; 
                var minutes = Math.floor(difference_ms % 60);
                difference_ms = difference_ms/60; 
                var hours = Math.floor(difference_ms % 24);  
                var days = Math.floor(difference_ms/24); 
                return [x,days,hours,minutes,seconds,difference_ms]
         

        }



}
var ImageLink= {
    getDefaultAvatar()
        {
            if (global.setting ==null || global.setting.AVATAR_DOCTER_DEFAULT == null)
            {
                return null;
            }
            return  {uri:(Config.URL_IMAGE+global.setting.AVATAR_DOCTER_DEFAULT)};
        },
        getFaceBookAvatar(fbid){
            if (fbid.length>15){
                fbid = fbid.replace(/\"/g,"");
                console.log(Config.URL_IMAGE+fbid)
                return  {uri:Config.URL_IMAGE+fbid};
            }
            else
            return  {uri:Config.URL_IMAGE+"/Uploads/FBAvartar/"+fbid+'.jpg'};
        },
        getUserDefaultAvatar()
        {
            return require("../../images/no_avatar.png")
        }
}
export {Conver,ImageLink};