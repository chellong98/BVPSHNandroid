
import Stogare from './Stogare';

function logout(navigate,redirect)
{
  global.login = null
  Stogare.remove("Login");
  if (navigate!=null)
  {
    navigate(redirect)
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default{
  logout:logout,
  validateEmail:validateEmail
}
