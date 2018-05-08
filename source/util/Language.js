
var vi = {
  Login:{
    titleSuccess:"Đăng nhập thành công",
    titleError:"Đăng nhập thất bại",
    hinAccount: "Email",
    hinPassword:"Mật khẩu"
  },
  Register:{
    hinAccount:"Email",
    hinPassword:"Mật Khẩu",
    hinPassword2:"Nhập lại mật khẩu",
    hinUserName:"Tên đầy đủ",
    hinPhone:"Điện Thoại",
    hinAddress:"Địa chỉ",
    texDoctor:"Là bệnh nhân",
    texCustomer:"Là bác sĩ",
    texGender_F:"Nữ",
    textGemder_M:"Nam",
    titleSuccess:"Đăng ký thành công",
    titleError:"Đăng ký thất bại",
  }
}
var lang = {vi:vi}
module = {
db:lang,
  get(key)
  {
    console.log( module.lang)
    return this.db[module.lang][this.form][key];
  },lang:"vi",
  form:""
}

export default module
