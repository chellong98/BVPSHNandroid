import {Config,Log,CMD} from '../util/Config'

ServiceRequest ={
    Login(  u,  p) {

        url = Config.API_URL
                + "SignIn?u="+ u
                + "&p=" + p;
                Log(url);
        return {query:url,cmd:CMD.LOGIN};
    },
    Register( info) {

        url = Config.API_URL
             + "SignUp?username="+ info.username
             + "&password=" + info.password
             + "&full_name="+ info.full_name
             + "&address=" + info.address
             + "&phone=" + info.phone
             + "&email=" + info.email
             + "&gender=" + info.gender
             + "&user_type=" + info.user_type
              Log(url);
        return {query:url,cmd:CMD.REGISTER};
    },
    LoginFB(id,first_name,email){
       var url = Config.API_URL
             + "FBLogin?id="+ id
             + "&first_name=" + first_name
             + "&email=" + email;
             Log(url);
       return {query:url,cmd:CMD.FB_LOGIN};
    },
    UpUType(  id,   t) {
       var url = Config.API_URL
               + "UpdateUType?id="+ id
               + "&t=" + t;
               Log(url);
        return {query:url,cmd:-1};
   },
    getDocterDetail( d_id) {
        var url = Config.API_URL
               + "getDocterDetail?d_id="+ d_id;
       Log(url);
        return {query:url,cmd:CMD.GET_DOCTER_DETAIL};
   },
   getAllDocter() {
       var url = Config.API_URL
               + "getAllDocter";
         Log(url);
         return {query:url,cmd:CMD.GET_ALL_DOCTER};
   }, getDocter(  u_id) {
       var url = Config.API_URL
               + "getDocter?u_id="+ u_id;
          Log(url);
        return {query:url,cmd:CMD.GET_DOCTER};
   },  getDictrct() {
        var url = Config.API_URL
                + "getDictrct";
         Log(url);
          return {query:url,cmd:CMD.GET_DICTRCT};
    },
    Booking(  p_id,   d_id,  sdt,   dt,   tam,   vs,   log,   lat)  {
        var url = Config.API_URL
                + "booking?p_id="+ p_id
                + "&d_id="+ d_id
                + "&tam="+ tam
                + "&vs="+ vs
                + "&log="+ log
                + "&lat="+ lat
                + "&sdt="+ sdt
                + "&dt=" +  encodeURI(dt);
           Log(url);
        return {query:url,cmd:CMD.P_BOOKING};;
    },
    getOneBooking(  id,   t) {
        var url = Config.API_URL
                + "getOneBooking?id="+ id
                + "&t="+ t;
          Log(url);
          return {query:url,cmd:CMD.DOC_GET_ONE_BOOKING};
    }, getBooking(  id,   p) {
         var url = Config.API_URL
                + "getBooking?"+p+"="+ id;
                Log(url);
        return {query:url,cmd:CMD.CMD_DOC_GET_BOOKING};
    },  getReason() {
        var url = Config.API_URL
                + "getReason";
        Log(url);
        return {query:url,cmd:CMD.GET_REASON};
    }, rateBooking(  id,   rate) {
        var url = Config.API_URL
                + "rateBooking?id="+ id
                + "&r="+ rate;
        Log(url);
        return {query:url,cmd:CMD.RATE_BOOKING};
    }, getSetting() {
        var url = Config.API_URL
                + "getSetting";
            Log(url);
            return {query:url,cmd:CMD.GET_SETTING};
    },bookingStatus(  id,   stt,   text)   {
        var url = Config.API_URL
                + "bookingStatus?id="+ id
                + "&stt="+ stt
                + "&t="+ encodeURI(text);
        Log(url);
        return {query:url,cmd:CMD.BOOKING_UPDATE};
    }, UpUType( id,  t) {
        var url = Config.API_URL
                + "UpdateUType?id="+ id
                + "&t=" + t;
                Log(url);
        return {query:url,cmd:CMD.CMD_FB_LOGIN};
    },getInfoUsingAccesstoken(token)
    {
        var url = "https://graph.facebook.com/v2.12/me?fields=id,name,gender&access_token="+token;
        Log(url);
        return {query:url,cmd:-2};
    },
      SaveDocter(  docter_info)  {

       var splDate = [];
        if (docter_info.date!=null)
       splDate =  docter_info.date.split("/")
       var year = '1989'
       var date="1/1/1989"
       if (splDate.length >2)
       {
        date =  splDate[1]+"/" +splDate[0]+"/" +splDate[2];
        year = splDate[2];

       }
        var url = Config.API_URL
                + "SaveDocter?d_id="+ docter_info.id
                + "&name=" + encodeURI(docter_info.full_name) 
                + "&dob=" + encodeURIComponent  (date)
                + "&info=" + encodeURI(docter_info.infor)
                + "&hosp=" + encodeURI(docter_info.hospital)
                + "&addr=" + encodeURI(docter_info.address)
                + "&ya=" + encodeURI(year) 
                + "&sex=" + encodeURI(docter_info.gender)
                + "&lat=" + encodeURI(docter_info.locate.latitude)
                + "&lon=" + encodeURI(docter_info.locate.longitude)
                Log(url);
            return {query:url,cmd:CMD.SAVE_DOCTER};
    }, SavePatient(  patient_info)  {
        var splDate = [];
        if (patient_info.date!=null)
         splDate =  patient_info.date.split("/")
        var date="1/1/1989"
        if (splDate.length >2)
        {
          date =  splDate[1]+"/" +splDate[0]+"/" +splDate[2];
        }
        
        var url = Config.API_URL
                + "SavePatient?u_id="+ patient_info.id
                + "&name=" + encodeURI(patient_info.full_name) 
                + "&dob=" +  encodeURI(date)
                + "&info=" + encodeURI(patient_info.infor)
                + "&addr=" + encodeURI(patient_info.address)
                + "&phone="+ encodeURI(patient_info.phone)
                + "&sex=" + encodeURI(patient_info.gender)
                + "&lat=" + encodeURI(patient_info.locate.latitude)
                + "&lon=" + encodeURI(patient_info.locate.longitude)
                Log(url);
            return {query:url,cmd:CMD.SAVE_PATIENT};
    },  getPatient(  u_id) {
        var url = Config.API_URL
                + "getPatient?u_id="+ u_id;
                Log(url);
         return {query:url,cmd:CMD.GET_PATIENT};
    }, uploadImage(imageUrl,fileName)
    {
        var url = Config.URL_IMAGE
        +"Upload";
        return {query:url,
            cmd:1000,
            label:'f',
            datatype:'image/jpeg',
            name:fileName,
            data:imageUrl
        };
    },
    updateAvatar(id,avatar){
        var url = Config.API_URL
        +"UpdateAvatar?"
        +"id="+id
        +"&avartar="+avatar;
        Log(url);
        return {query:url,
            cmd:1001,
            
        };
    },sendMail(gmail,body)
    {
        var url = Config.API_URL
        +"sendMail?"
        +"mail="+encodeURIComponent(gmail)
        +"&body="+encodeURIComponent(body);
        Log(url);
        return {query:url,
            cmd:1002,
            
        };

    },changePassword(id,pass)
    {
        var url = Config.API_URL
        +"changePass?"
        +"id="+id
        +"&pass="+encodeURIComponent(pass);
        Log(url);
        return {query:url,
            cmd:1002,
            
        };
    }


}
export default  ServiceRequest
