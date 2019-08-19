import api from '@/services'
import { getToken, setToken } from '@/util/auth'
import router from '@/route/router'
import store from '@/store'

const {
  login,
  register,
  sendSms,
  getUserInfo,
  ocrfile,
  submitOrder,
  carCity,
  carList,
  inquiry,
  notifyList,
  assessAmount,
} = api;

const user = {
  state: {
    token: getToken(),
    name: '',
    roles: [],
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
  },
  actions: {
    getUserInfo({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getUserInfo(payload).then(res => {
          const { code, data } = res;
          if (code === '1') {
            setToken('rights_desc', data['rights_desc']);

            let roles = res.data['rights_desc'];
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              router.addRoutes(store.getters.addRoutes);
            });

            if (data['rights_desc']) {
              commit('SET_ROLES', data['rights_desc'])
            } else {
              commit('SET_ROLES', 'Customer')
            }
          }
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    Register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        register(payload).then(res => {
          const { code, data } = res;
          if (code === '1') {
            setToken('token', data.token);
            setToken('rights_desc', data['rights_desc']);
            commit('SET_TOKEN', data.token)
          }
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    Login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        login(payload).then(res => {
          const { code, data } = res;
          if (code === '1') {
            setToken('token', data.token);
            commit('SET_TOKEN', data.token)
          }
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    SendSms({ commit }, payload) {
      return new Promise((resolve, reject) => {
        sendSms(payload).then(res => {
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    ocrfileImg({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ocrfile(payload).then(res => {
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    submitOrderId({ commit }, payload) {
      return new Promise((resolve, reject) => {
        submitOrder(payload).then(res => {
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    postCarCity({ commit }, payload) {
      return new Promise((resolve, reject) => {
        carCity(payload).then(res => {
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    cheCarList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        carList(payload).then(res => {
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    subInquiryOrder({ commit }, payload) {
      return new Promise((resolve, reject) => {
        inquiry(payload).then(res => {
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    notifyListMsg({ commit }, payload) {
      return new Promise((resolve, reject) => {
        notifyList(payload).then(res => {
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    orderAssessAmount({ commit }, payload) {
      return new Promise((resolve, reject) => {
        assessAmount(payload).then(res => {
          resolve(res)
        }).catch(error => reject(error))
      })
    },
  },
};

export default user