import React, { Component } from 'react'
import { AsyncStorage, Text, View, TextInput, StyleSheet } from 'react-native'

module = {
   async save(key,str)
  {
    try {

      await  AsyncStorage.setItem('@GiayNhap:'+key, str);
    } catch (error) {
      console.log(error);
    }
  },
   async saveLogin(db)
  {

      await this.save("Login",JSON.stringify(db));
  },

   async get(key){

    try {
          console.log("GET: "+key);
      const value =  await AsyncStorage.getItem('@GiayNhap:'+key).then((value)=> {return value});;

       return value;
    } catch (error) {
        console.log(error);
       return null;
    }
  },
  async remove(key)
  {
    try {
  await  AsyncStorage.removeItem('@GiayNhap:'+key)
  } catch (error) {
    console.log(error);
  }
  }

  ,
   async isFirst(){
      var value = await this.get("first")
      if (value==null) return true
      return false;
  },
  setfirst(){

    this.save("first","true")
  },
  async getLogin()
  {
    var login = await this.get("Login");
    if (login==null) return null;
    try {

      return JSON.parse(login);
    } catch (error) {
       return null;
    }
  }

}
export default module;
