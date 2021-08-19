import Cookies from 'js-cookie'

const TokenKey = 'token'
// const signKey = 'Admin-Sign'
const uidKey = 'uid'
const userNameKey = 'userName'
const ViewOrgKey = 'ViewOrg'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// export function getSign() {
//   return Cookies.get(signKey)
// }

// export function setSign(sign) {
//   return Cookies.set(signKey, sign)
// }

// export function removeSign() {
//   return Cookies.remove(signKey)
// }

export function getUid() {
  return Cookies.get(uidKey)
}

export function setUid(uid) {
  return Cookies.set(uidKey, uid)
}

export function removeUid() {
  return Cookies.remove(uidKey)
}

export function getUserName() {
  return Cookies.get(userNameKey)
}

export function setUserName(userName) {
  return Cookies.set(userNameKey, userName)
}

export function removeUserName() {
  return Cookies.remove(userNameKey)
}

export function getViewOrg() {
  return Cookies.get(ViewOrgKey)
}

export function setViewOrg(ViewOrg) {
  return Cookies.set(ViewOrgKey, ViewOrg)
}

export function removeViewOrg() {
  return Cookies.remove(ViewOrgKey)
}


