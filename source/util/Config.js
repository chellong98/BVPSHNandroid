const Config = {
    API_URL : "http://backup.hipcorp.vn/API/",
    URL_IMAGE : "http://backup.hipcorp.vn/",
}
const CMD = {
    REGISTER : 0,
    LOGIN : 1,
    SAVE_DOCTER : 2,
    GET_DOCTER : 3,
    GET_ALL_DOCTER : 4,
    GET_DOCTER_DETAIL : 5,
    P_BOOKING : 6,
    DOC_GET_BOOKING : 7,
    BOOKING_UPDATE : 8,
    FB_LOGIN : 9,
    SAVE_PATIENT : 10,
    GET_PATIENT : 11,
    DOC_GET_ONE_BOOKING : 12,
    GET_DICTRCT: 13,
    RATE_BOOKING: 14,
    GET_REASON : 15,
    GET_SETTING : 16,
}
const Log = (e)=>console.log("[Log] "+e);
const USER={
    CUSTOMER:2,
    DOCTER:1,
}
const routes=   [
    {title:"Lịch sử đặt",cmd:"HistoryBooking",type:0,ios:"ios-settings",md:"md-settings"},
    {title:"Thông tin",cmd:"Option",type:0, ios:"ios-create-outline", md:"md-create" },
    {title:"Chia sẻ",cmd:"Home",type:-2,ios:"md-share", md:"md-share"},
    {title:"Thoát",cmd:"",type:-1,   ios:"ios-exit-outline", md:"md-exit" },
    ];

export {
    Config, Log , CMD,routes,USER
}

