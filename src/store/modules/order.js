import api from '@/services'
const { ordList, ordListCount, orderDetailed, colseInquiry } = api;
const order = {
  state: {
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },
  actions: {
    orderList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ordList(payload).then(res => {
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    ordListCountList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        ordListCount(payload).then(res => {
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    orderDetail({ commit }, payload) {
      return new Promise((resolve, reject) => {
        orderDetailed(payload).then(res => {
          resolve(res)
        }).catch(error => reject(error))
      })
    },
    endColseInquiry({ commit }, payload) {
      return new Promise((resolve, reject) => {
        colseInquiry(payload).then(res => {
          resolve(res)
        }).catch(error => reject(error))
      })
    },
  },
};

export default order