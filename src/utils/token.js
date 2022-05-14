export function setToken(token) {
  return window.sessionStorage.setItem('TOKEN', token)
}
export function getToken() {
  return window.sessionStorage.getItem('TOKEN')
}
export function removeToken() {
  return window.sessionStorage.removeItem('TOKEN')
}
