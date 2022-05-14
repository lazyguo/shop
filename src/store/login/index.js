import { login, userInfo, logout } from '../../api/login'
import { setToken, getToken, removeToken } from '../../utils/token'

const state = {
  username: '',
  avatar: '',
  roles: '',
  token: getToken()
}
const mutations = {
  SET_TOKEN(state, data) {
    state.username = data.username
  },
  GET_USERINFO(state, data) {
    state.username = data.data.name
    state.avatar = data.data.avatar
    state.roles = data.data.roles
  },
  LOGOUT(state, data) {
    removeToken()
  }
}
const actions = {
  // 用户登陆
  async login({ commit }, userInfo) {
    const { password, username } = userInfo
    const result = await login({
      password: password.trim(),
      username: username.trim()
    })
    if (result.data.code === 20000) {
      console.log(result.data)
      const res = result.data
      commit('SET_TOKEN', res)
      setToken(res.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error(result.data.code))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const res = await userInfo()
    if (res.data.code === 20000) {
      console.log(res.data)
      commit('GET_USERINFO', res.data)
      console.log('获取用户信息成功')
      return 'ok'
    } else {
      return Promise.reject(new Error('获取用户信息失败'))
    }
  },
  // 用户登出
  async logout({ commit }) {
    const res = await logout()
    if (res.data.code === 20000) {
      commit('LOGOUT', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('退出失败'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
